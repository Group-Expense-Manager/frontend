import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useGroup from '@/hooks/group/UseGroup';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentCurrencies() {
  const { t } = useTranslation();
  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);
  const { data: groupDetails } = useGroup(paymentCreation.groupId);

  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState<SelectInputData<Currency>>({
    value: paymentCreation.baseCurrency,
    name: paymentCreation.baseCurrency.code,
  });

  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<SelectInputData<Currency>>({
    value: paymentCreation.targetCurrency ?? { code: '' },
    name: paymentCreation.targetCurrency?.code ?? '',
  });

  const isNextButtonDisabled = !paymentCreation.baseCurrency.code;

  const baseCurrencies = () => {
    return groupDetails?.groupCurrencies.map((currency) => {
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
        setPaymentCreation({
          ...paymentCreation,
          baseCurrency: currency,
        });
      } else {
        setSelectedTargetCurrency({
          value: groupDetails!.groupCurrencies[0],
          name: groupDetails!.groupCurrencies[0].code,
        });
        setPaymentCreation({
          ...paymentCreation,
          baseCurrency: currency,
          targetCurrency: groupDetails!.groupCurrencies[0],
        });
      }
    } else {
      setSelectedTargetCurrency({
        value: { code: '' },
        name: '',
      });
      setPaymentCreation({
        ...paymentCreation,
        baseCurrency: currency,
        targetCurrency: undefined,
      });
    }
  }

  function setTargetCurrency(currency: Currency) {
    setSelectedTargetCurrency({ value: currency, name: currency.code });
    setPaymentCreation({
      ...paymentCreation,
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
                    onPress={() => router.navigate('/payments/new/base-currency-select')}
                    label={t('Currency')}
                    value={selectedBaseCurrency}
                    data={baseCurrencies()}
                  />
                </View>
                {isCurrencyNotInGroupCurrencies(selectedBaseCurrency.value) && (
                  <View>
                    <SelectInput
                      onSelect={setTargetCurrency}
                      onPress={() => router.navigate('/payments/new/target-currency-select')}
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
                router.push('/payments/new/value');
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
