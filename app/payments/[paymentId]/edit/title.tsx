import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function EditPaymentTitle() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();
  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.trim().length > 0;
      },
      errorMessage: '',
    },
    {
      rule(arg: string) {
        return arg.length <= 30;
      },
      errorMessage: t('Payment title may contain at most 30 characters'),
    },
  ]);

  const isNextButtonDisabled = validator.validate(paymentUpdate.title).length !== 0;

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Payment title')}
              onChangeText={(title: string) => setPaymentUpdate({ ...paymentUpdate, title })}
              value={paymentUpdate.title}
              errorMessages={
                paymentUpdate.title === '' ? [] : validator.validate(paymentUpdate.title)
              }
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/payments/${params.paymentId}/edit/date`)}
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
