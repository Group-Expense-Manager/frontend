import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export default function useDeletePayment(groupId: string, paymentId: string) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(`${API_URL}${PATHS.EXTERNAL}/payments/${paymentId}/groups/${groupId}`, {
        headers: {
          host: HOST.PAYMENT_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: [`/payments/${paymentId}/groups/${groupId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [`/activities/groups/${groupId}`],
      });

      router.navigate('/groups');
    },
    onError: () => {
      router.replace(`/payments/${paymentId}/error-modal`);
    },
  });
}
