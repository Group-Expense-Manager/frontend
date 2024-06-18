import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, GestureResponderEvent, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext, ExpenseCreationProps } from '@/context/ExpenseCreationContext';
import useExpenseCreation from '@/hooks/expense/UseExpenseCreation';

export default function ExpenseTitle() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseMessage, setExpenseMessage] = useState<string>('');

  const createExpense = useExpenseCreation();

  const handleCreateExpense = (expenseCreationProps: ExpenseCreationProps) => {
    return (event: GestureResponderEvent) => {
      createExpense(expenseCreationProps);
    };
  };

  useEffect(() => {
    console.log(expenseMessage);
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseCreationProps.title,
      cost: expenseCreationProps.cost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseMessage,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [expenseMessage]);

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
                label={t('Comment')}
                onChangeText={setExpenseMessage}
                value={expenseMessage}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                title={t('Create expense')}
                onPress={() => {
                  handleCreateExpense(expenseCreationProps);
                }}
              />
            </View>
            <View className="w-full">
              <CustomButton
                title={t('Back')}
                onPress={() =>
                  router.navigate('(stepper)/(expense-creation)/expense-cost-division')
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
