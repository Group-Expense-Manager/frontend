import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useAvailableCurrencies, { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useGroup from '@/hooks/group/UseGroup';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseCurrencies() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const { data: groupDetails } = useGroup(expenseCreation.groupId);

  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState<SelectInputData<Currency>>({
    value: expenseCreation.baseCurrency,
    name: expenseCreation.baseCurrency.code,
  });

  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<SelectInputData<Currency>>({
    value: expenseCreation.targetCurrency ? expenseCreation.targetCurrency : { code: '' },
    name: expenseCreation.targetCurrency ? expenseCreation.targetCurrency.code : '',
  });

  const isNextButtonDisabled = !expenseCreation.baseCurrency.code;

  const { data: availableCurrencies } = useAvailableCurrencies();

  const baseCurrencies = () => {
    return availableCurrencies?.currencies.map((currency) => {
      return { value: currency, name: currency.code };
    });
  };

  const targetCurrencies = () => {
    return groupDetails?.groupCurrencies.map((currency) => {
      return { value: currency, name: currency.code };
    });
  };

  function setBaseCurrency(currency: Currency) {
    setSelectedBaseCurrency({ value: currency, name: currency.code });

    if (isCurrencyNotInGroupCurrencies(currency)) {
      if (selectedTargetCurrency.name) {
        setExpenseCreation({
          ...expenseCreation,
          baseCurrency: currency,
        });
      } else {
        setSelectedTargetCurrency({
          value: groupDetails!.groupCurrencies[0],
          name: groupDetails!.groupCurrencies[0].code,
        });
        setExpenseCreation({
          ...expenseCreation,
          baseCurrency: currency,
          targetCurrency: groupDetails!.groupCurrencies[0],
        });
      }
    } else {
      setSelectedTargetCurrency({
        value: { code: '' },
        name: '',
      });
      setExpenseCreation({
        ...expenseCreation,
        baseCurrency: currency,
        targetCurrency: undefined,
      });
    }
  }

  function setTargetCurrency(currency: Currency) {
    setSelectedTargetCurrency({ value: currency, name: currency.code });
    setExpenseCreation({
      ...expenseCreation,
      targetCurrency: currency,
    });
  }

  function isCurrencyNotInGroupCurrencies(currency: Currency): boolean {
    return (
      !!currency.code &&
      !groupDetails?.groupCurrencies
        .map((groupCurrency) => groupCurrency.code)
        .includes(currency.code)
    );
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col">
            {groupDetails ? (
              <View className="space-y-8">
                <View>
                  <SelectInput
                    onSelect={setBaseCurrency}
                    onPress={() => router.navigate('/expenses/new/base-currency-select')}
                    label={t('Currency')}
                    value={selectedBaseCurrency}
                    data={baseCurrencies()}
                  />
                </View>
                {isCurrencyNotInGroupCurrencies(selectedBaseCurrency.value) && (
                  <View>
                    <SelectInput
                      onSelect={setTargetCurrency}
                      onPress={() => router.navigate('/expenses/new/target-currency-select')}
                      label={t('Target currency')}
                      value={selectedTargetCurrency}
                      data={targetCurrencies()}
                    />
                  </View>
                )}
              </View>
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => {
                router.push('/expenses/new/total-cost');
              }}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
