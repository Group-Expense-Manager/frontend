import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CalendarModal from '@/components/ui/calendar/CalendarModal';
import SingleTextLabel from '@/components/ui/text-input/SingleTextLabel';
import { formatDateToDefaultFormat } from '@/constants/Date';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditExpenseDate() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);
  const textInputRef = useRef<any>(null);
  const isNextButtonDisabled = expenseUpdate.expenseDate === undefined;

  const handleDateSelected = (date: Date) => {
    textInputRef.current?.blur();
    setExpenseUpdate({ ...expenseUpdate, expenseDate: date });
    setCalendarVisible(false);
  };

  const handleShowCalendar = () => {
    textInputRef.current?.focus();
    setCalendarVisible(true);
  };

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <SingleTextLabel
              ref={textInputRef}
              label={t('Expense date')}
              value={formatDateToDefaultFormat(expenseUpdate.expenseDate)}
              onPress={handleShowCalendar}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/expenses/${params.expenseId}/edit/currencies`)}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>

        <CalendarModal
          title={t('Select Expense Date')}
          onDateSelected={handleDateSelected}
          initialDate={expenseUpdate.expenseDate}
          setCalendarVisible={setCalendarVisible}
          isCalendarVisible={isCalendarVisible}
        />
      </View>
    </Box>
  );
}
