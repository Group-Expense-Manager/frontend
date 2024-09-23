import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

import DeleteActivityPopover from '@/components/ui/popover/DeleteActivityPopover';
import { GlobalContext } from '@/context/GlobalContext';
import useDeleteExpense from '@/hooks/expense/UseDeleteExpense';

export default function DeleteExpenseModal() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{ expenseId: string }>();
  const { userData } = useContext(GlobalContext);

  const { mutate: deleteExpense, isPending: iseDeletionPending } = useDeleteExpense(
    userData.currentGroupId!,
    params.expenseId,
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => iseDeletionPending);
    return () => backHandler.remove();
  }, [iseDeletionPending]);

  return (
    <DeleteActivityPopover
      title={t('Delete expense - title')}
      description={t('Delete expense - description')}
      onConfirm={deleteExpense}
      isLoading={iseDeletionPending}
    />
  );
}
