import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';

export default function ExpenseCost() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseCost, setExpenseCost] = useState<string>('');

  function onChanged(text: string) {
    setExpenseCost(text.replace(/[^0-9.]/g, ''));
  }

  useEffect(() => {
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseCreationProps.title,
      cost: Number(expenseCost),
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [expenseCost]);

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
              <CustomTextInput
                label={t('Expense cost')}
                onChangeText={(text) => onChanged(text)}
                value={expenseCost.toString()}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                title={t('Next')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-participants')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                title={t('Back')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-currency')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
