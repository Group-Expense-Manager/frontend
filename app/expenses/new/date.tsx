import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CalendarModal from '@/components/ui/calendar/CalendarModal';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import { formatDateToDefaultFormat } from '@/constants/Date';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseDate() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const isNextButtonDisabled = expenseCreation.expenseDate === undefined;

  const handleDateSelected = (date: Date) => {
    setExpenseCreation({ ...expenseCreation, expenseDate: new Date(date) });
    setCalendarVisible(false);
  };

  return (
    <Box>
      <View>
        <View className="py-8 w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="py-8 w-full flex flex-col space-y-8">
              <SingleTextInput
                label={t('Expense date')}
                value={formatDateToDefaultFormat(expenseCreation.expenseDate)}
                onPress={() => setCalendarVisible(true)}
              />
            </View>
          </View>

          <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
            <View className="w-full">
              <CustomButton
                onPress={() => router.push('/expenses/new/currencies')}
                title={t('Next')}
                disabled={isNextButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
            </View>
          </View>
        </View>

        <CalendarModal
          title={t('Select Expense Date')}
          onDateSelected={handleDateSelected}
          initialDate={expenseCreation.expenseDate}
          setCalendarVisible={setCalendarVisible}
          isCalendarVisible={isCalendarVisible}
        />
      </View>
    </Box>
  );
}
