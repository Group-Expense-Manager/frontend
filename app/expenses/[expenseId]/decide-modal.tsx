import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

import ActivityDecisionPopover from '@/components/ui/popover/ActivityDecisionPopover';
import { GlobalContext } from '@/context/GlobalContext';
import useAddExpenseDecision from '@/hooks/expense/UseAddExpenseDecision';

export default function ExpenseDecideModal() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{ expenseId: string }>();
  const { userData } = useContext(GlobalContext);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [decision, setDecision] = useState<'ACCEPT' | 'REJECT' | 'NONE'>('NONE');

  const { mutate: addExpenseDecision, isPending: iseDecisionPending } = useAddExpenseDecision({
    expenseId: params.expenseId,
    groupId: userData.currentGroupId!,
    decision,
    message,
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => iseDecisionPending);
    return () => backHandler.remove();
  }, [iseDecisionPending]);

  return (
    <ActivityDecisionPopover
      title={t('Expense decide')}
      description={t('Expense decide - description')}
      onConfirmPress={addExpenseDecision}
      message={message}
      onMessageChange={(text) => setMessage(text ? text : undefined)}
      decision={decision}
      onAcceptPress={() => {
        setDecision(decision === 'ACCEPT' ? 'NONE' : 'ACCEPT');
      }}
      onRejectPress={() => {
        setDecision(decision === 'REJECT' ? 'NONE' : 'REJECT');
      }}
      isLoading={iseDecisionPending}
    />
  );
}
