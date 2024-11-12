import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { Payment } from '@/hooks/payment/UsePayment';

export interface PaymentDecision {
  paymentId: string;
  groupId: string;
  decision: string;
  message?: string;
}

export default function useAddPaymentDecision(paymentDecision: PaymentDecision) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}${PATHS.EXTERNAL}/payments/decide`, paymentDecision, {
        headers: {
          host: HOST.PAYMENT_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: async (response: AxiosResponse<Payment>) => {
      queryClient.setQueryData(
        [`/payments/${paymentDecision.paymentId}/groups/${paymentDecision.groupId}`],
        () => {
          return response.data;
        },
      );

      queryClient.removeQueries({
        queryKey: [`/activities/groups/${paymentDecision.groupId}`],
        exact: false,
      });

      router.back();
    },
    onError: () => {
      router.replace(`/payments/${paymentDecision.paymentId}/error-modal`);
    },
  });
}
