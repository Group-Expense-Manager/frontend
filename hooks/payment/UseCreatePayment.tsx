import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import { Payment } from '@/hooks/payment/UsePayment';

export default function useCreatePayment() {
  const { authState, userData, setUserData } = useContext(GlobalContext);
  const { paymentCreation } = useContext(PaymentCreationContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/payments?groupId=${paymentCreation.groupId}`,
        {
          title: paymentCreation.title,
          type: paymentCreation.type,
          amount: {
            value: paymentCreation.value,
            currency: paymentCreation.baseCurrency.code,
          },
          targetCurrency: paymentCreation.targetCurrency?.code,
          date: paymentCreation.date,
          recipientId: paymentCreation.recipientId,
          message: paymentCreation.message,
          attachmentId: paymentCreation.attachmentId,
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
      queryClient.setQueryData(
        [`/payments/${response.data.expenseId}/groups/${paymentCreation.groupId}`],
        () => {
          return response.data;
        },
      );
      queryClient.invalidateQueries({
        queryKey: [`/activities/groups/${paymentCreation.groupId}`],
      });
      setUserData({ ...userData, currentGroupId: paymentCreation.groupId });
      router.navigate('/groups');
      router.push(`/payments/${response.data.expenseId}`);
    },
    onError: () => {
      router.push('/expenses/new/error-modal');
    },
  });
}
