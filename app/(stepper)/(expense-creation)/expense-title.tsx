import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';

export default function ExpenseTitle() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const [expenseName, setExpenseName] = useState<string>('');

  useEffect(() => {
    console.log(expenseName);
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
    <SafeAreaView className="flex-1 justify-center">
      <TextInput
        className="text-center"
        placeholder={t('Expense name')}
        onChangeText={setExpenseName}
      />
      <Button
        title={t('Next')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-date')}
      />
      <Button
        title={t('Back')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-group')}
      />
    </SafeAreaView>
  );
}
