import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

import DeleteActivityPopover from '@/components/ui/popover/DeleteActivityPopover';
import { GlobalContext } from '@/context/GlobalContext';
import useDeletePayment from '@/hooks/payment/UseDeletePayment';

export default function DeletePaymentModal() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{ paymentId: string }>();
  const { userData } = useContext(GlobalContext);

  const { mutate: deletePayment, isPending: iseDeletionPending } = useDeletePayment(
    userData.currentGroupId!,
    params.paymentId,
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => iseDeletionPending);
    return () => backHandler.remove();
  }, [iseDeletionPending]);

  return (
    <DeleteActivityPopover
      title={t('Delete payment - title')}
      description={t('Delete payment - description')}
      onConfirm={deletePayment}
      isLoading={iseDeletionPending}
    />
  );
}
