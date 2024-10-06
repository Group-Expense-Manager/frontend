import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentType } from '@/context/payment/PaymentCreationContext';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditPaymentType() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();

  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);

  const [selectedType, setSelectedType] = useState<SelectInputData<PaymentType>>({
    value: paymentUpdate.type,
    name: t(paymentUpdate.type),
  });

  const paymentTypes = () => {
    return Object.values(PaymentType).map((type) => ({ value: type, name: t(type) }));
  };

  function setPaymentType(paymentType: PaymentType) {
    setSelectedType({ value: paymentType, name: t(paymentType) });
    setPaymentUpdate({
      ...paymentUpdate,
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
              onPress={() => router.navigate(`/payments/${params.paymentId}/edit/type-select`)}
              label={t('Payment method')}
              value={selectedType}
              data={paymentTypes()}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/payments/${params.paymentId}/edit/currencies`)}
              title={t('Next')}
              disabled={!paymentUpdate.type}
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
