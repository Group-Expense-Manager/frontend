import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import useAvailableCurrencies, { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useGroup from '@/hooks/group/UseGroup';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditExpenseCurrencies() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ expenseId: string }>();

  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);
  const { userData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);

  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState<Currency>(
    expenseUpdate.baseCurrency,
  );

  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<Currency>(
    expenseUpdate.targetCurrency ?? { code: '' },
  );

  const isNextButtonDisabled = !expenseUpdate.baseCurrency.code;

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
    setSelectedBaseCurrency(currency);

    if (isCurrencyNotInGroupCurrencies(currency)) {
      if (selectedTargetCurrency.code) {
        setExpenseUpdate({
          ...expenseUpdate,
          baseCurrency: currency,
        });
      } else {
        setSelectedTargetCurrency(groupDetails!.groupCurrencies[0]);
        setExpenseUpdate({
          ...expenseUpdate,
          baseCurrency: currency,
          targetCurrency: groupDetails!.groupCurrencies[0],
        });
      }
    } else {
      setSelectedTargetCurrency({ code: '' });
      setExpenseUpdate({
        ...expenseUpdate,
        baseCurrency: currency,
        targetCurrency: undefined,
      });
    }
  }

  function setTargetCurrency(currency: Currency) {
    setSelectedTargetCurrency(currency);
    setExpenseUpdate({
      ...expenseUpdate,
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
                    onPress={() =>
                      router.navigate(`/expenses/${params.expenseId}/edit/base-currency-select`)
                    }
                    label={t('Currency')}
                    value={selectedBaseCurrency}
                    data={baseCurrencies()}
                  />
                </View>
                {isCurrencyNotInGroupCurrencies(selectedBaseCurrency) && (
                  <View>
                    <SelectInput
                      onSelect={setTargetCurrency}
                      onPress={() =>
                        router.navigate(`/expenses/${params.expenseId}/edit/target-currency-select`)
                      }
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
                router.push(`/expenses/${params.expenseId}/edit/total-cost`);
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
