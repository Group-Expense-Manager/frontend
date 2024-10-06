import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { Payment } from '@/hooks/payment/UsePayment';

export default function useUpdatePayment(groupId: string, paymentId: string) {
  const { authState } = useContext(GlobalContext);
  const { paymentUpdate } = useContext(PaymentUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/payments/${paymentId}/groups/${groupId}`,
        {
          title: paymentUpdate.title,
          type: paymentUpdate.type,
          amount: {
            value: paymentUpdate.value,
            currency: paymentUpdate.baseCurrency.code,
          },
          targetCurrency: paymentUpdate.targetCurrency?.code,
          date: paymentUpdate.date,
          message: paymentUpdate.message,
          attachmentId: paymentUpdate.newAttachmentId,
        },
        {
          headers: {
            host: HOST.PAYMENT_MANAGER,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<Payment>) => {
      queryClient.setQueryData([`/payments/${response.data.paymentId}/groups/${groupId}`], () => {
        return response.data;
      });
      queryClient.invalidateQueries({
        queryKey: [`/activities/groups/${groupId}`],
      });
      router.navigate(`/payments/${paymentId}`);
    },
    onError: () => {
      router.push(`/payments/${paymentId}/edit/error-modal`);
    },
  });
}
