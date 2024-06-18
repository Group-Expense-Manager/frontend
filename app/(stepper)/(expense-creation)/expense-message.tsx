import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, GestureResponderEvent, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1 justify-center">
      <TextInput
        className="text-center"
        placeholder={t('Comment')}
        onChangeText={setExpenseMessage}
      />
      <Button title={t('Create expense')} onPress={handleCreateExpense(expenseCreationProps)} />
      <Button
        title={t('Cancel')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost-division')}
      />
    </SafeAreaView>
  );
}
