import Decimal from 'decimal.js';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentUpdate, PaymentUpdateProvider } from '@/context/payment/PaymentUpdateContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import usePayment, { Payment } from '@/hooks/payment/UsePayment';

const EditPaymentLayout = () => {
  const params = useLocalSearchParams<{ paymentId: string }>();
  const { userData } = useContext(GlobalContext);

  const { data: payment } = usePayment(params.paymentId);
  const { data: attachment } = useGroupPicture(userData.currentGroupId!, payment?.attachmentId);

  function getUpdate(payment: Payment, attachment?: ImageBase64): PaymentUpdate {
    return {
      title: payment.title,
      type: payment.type,
      value: new Decimal(payment.amount.value),
      baseCurrency: { code: payment.amount.currency },
      targetCurrency: payment.fxData?.targetCurrency
        ? { code: payment.fxData?.targetCurrency }
        : undefined,
      date: new Date(payment.date),
      oldAttachment: attachment,
      newAttachment: attachment,
      newAttachmentId: payment.attachmentId,
      oldAttachmentId: payment.attachmentId,
    };
  }

  return !!payment && (!payment.attachmentId || !!attachment) ? (
    <PaymentUpdateProvider update={getUpdate(payment, attachment)}>
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </PaymentUpdateProvider>
  ) : (
    <Loader />
  );
};
export default EditPaymentLayout;
