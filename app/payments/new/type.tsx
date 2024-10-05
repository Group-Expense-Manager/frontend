import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentCreationContext, PaymentType } from '@/context/payment/PaymentCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentType() {
  const { t } = useTranslation();

  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);

  const [selectedType, setSelectedType] = useState<SelectInputData<PaymentType | undefined>>({
    value: undefined,
    name: '',
  });

  const paymentTypes = () => {
    return Object.values(PaymentType).map((type) => ({ value: type, name: t(type) }));
  };

  useEffect(() => {
    if (paymentCreation.type) {
      setSelectedType({ value: paymentCreation.type, name: t(paymentCreation.type) });
    }
  }, [paymentCreation.type]);

  function setPaymentType(paymentType: PaymentType) {
    setSelectedType({ value: paymentType, name: t(paymentType) });
    setPaymentCreation({
      ...paymentCreation,
      type: paymentType,
    });
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <SelectInput
              onSelect={setPaymentType}
              onPress={() => router.navigate('/payments/new/type-select')}
              label={t('Payment method')}
              value={selectedType}
              data={paymentTypes()}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/payments/new/currencies')}
              title={t('Next')}
              disabled={!paymentCreation.type}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Cancel')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
