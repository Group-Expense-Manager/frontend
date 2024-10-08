import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { numberToString, toDecimal } from '@/util/StringUtils';

export default function EditPaymentValue() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();

  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);
  const [valueString, setTotalCostString] = useState<string>(numberToString(paymentUpdate.value));

  const isNextButtonDisabled = paymentUpdate.value.isZero() || paymentUpdate.value.isNegative();

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <CostTextInput
              label={`${t('Payment value')} (${paymentUpdate.baseCurrency.code})`}
              onChangeText={(value: string) => {
                setTotalCostString(value);
                const valueNumber = toDecimal(value);
                setPaymentUpdate({
                  ...paymentUpdate,
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
              onPress={() => router.push(`/payments/${params.paymentId}/edit/attachment`)}
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
