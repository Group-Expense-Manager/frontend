import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

import ActivityDecisionPopover from '@/components/ui/popover/ActivityDecisionPopover';
import { GlobalContext } from '@/context/GlobalContext';
import useAddPaymentDecision from '@/hooks/payment/UseAddPaymentDecision';

export default function PaymentDecideModal() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{ paymentId: string }>();
  const { userData } = useContext(GlobalContext);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [decision, setDecision] = useState<'ACCEPT' | 'REJECT' | 'NONE'>('NONE');

  const { mutate: addPaymentDecision, isPending: iseDecisionPending } = useAddPaymentDecision({
    paymentId: params.paymentId,
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
      title={t('Payment decide')}
      description={t('Payment decide - description')}
      onConfirmPress={addPaymentDecision}
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
