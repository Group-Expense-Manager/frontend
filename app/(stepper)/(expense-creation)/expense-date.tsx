import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';

import { CustomButton } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';

export default function ExpenseDate() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());

  function setDate(date: Date | undefined) {
    date !== undefined && setExpenseDate(date);
  }

  useEffect(() => {
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseCreationProps.title,
      cost: expenseCreationProps.cost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [expenseDate]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <View>
              <DatePickerInput
                label={t('Expense date')}
                inputMode="start"
                locale="pl"
                onChange={setDate}
                value={expenseDate}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-currency')}
                title={t('Next')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-title')}
                title={t('Back')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
