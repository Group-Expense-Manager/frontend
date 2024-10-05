import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { numberToString, toDecimal } from '@/util/StringUtils';

export default function NewPaymentValue() {
  const { t } = useTranslation();
  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);
  const [valueString, setTotalCostString] = useState<string>(numberToString(paymentCreation.value));

  const isNextButtonDisabled = paymentCreation.value.isZero() || paymentCreation.value.isNegative();

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <CostTextInput
              label={`${t('Payment value')} (${paymentCreation.baseCurrency.code})`}
              onChangeText={(value: string) => {
                setTotalCostString(value);
                const valueNumber = toDecimal(value);
                setPaymentCreation({
                  ...paymentCreation,
                  value: valueNumber,
                });
              }}
              value={valueString}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/payments/new/attachment')}
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
