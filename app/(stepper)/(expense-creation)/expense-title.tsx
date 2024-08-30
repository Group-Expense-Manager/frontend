import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { IconSize } from '@/util/IconSize';

export default function ExpenseTitle() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseName, setExpenseName] = useState<string>('');

  useEffect(() => {
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseName,
      cost: expenseCreationProps.cost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [expenseName]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <View>
              <CustomTextInput
                label={t('Expense name')}
                onChangeText={setExpenseName}
                value={expenseName}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-date')}
                title={t('Next')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-group')}
                title={t('Back')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
