import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CalendarModal from '@/components/ui/calendar/CalendarModal';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import { formatDateToDefaultFormat } from '@/constants/Date';
import { LogoIcon } from '@/constants/Icon';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditPaymentDate() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();
  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const isNextButtonDisabled = paymentUpdate.date === undefined;

  const handleDateSelected = (date: Date) => {
    setPaymentUpdate({ ...paymentUpdate, date });
    setCalendarVisible(false);
  };

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <SingleTextInput
              label={t('Payment date')}
              value={formatDateToDefaultFormat(paymentUpdate.date)}
              onPress={() => setCalendarVisible(true)}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/payments/${params.paymentId}/edit/type`)}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>

        <CalendarModal
          title={t('Select Payment Date')}
          onDateSelected={handleDateSelected}
          initialDate={paymentUpdate.date}
          setCalendarVisible={setCalendarVisible}
          isCalendarVisible={isCalendarVisible}
        />
      </View>
    </Box>
  );
}
