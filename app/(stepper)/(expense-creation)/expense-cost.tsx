import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';

export default function ExpenseCost() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseCost, setExpenseCost] = useState<number>(0);

  useEffect(() => {
    console.log(expenseCost);
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseCreationProps.title,
      cost: expenseCost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [expenseCost]);

  return (
    <SafeAreaView className="flex-1 justify-center">
      <TextInput
        className="text-center"
        placeholder={t('Expense cost')}
        onChangeText={(text) => setExpenseCost(Number(text))}
      />
      <Button
        title={t('Next')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-participants')}
      />
      <Button
        title={t('Back')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-currency')}
      />
    </SafeAreaView>
  );
}
