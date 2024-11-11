import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export default function useDeleteExpense(groupId: string, expenseId: string) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(`${API_URL}${PATHS.EXTERNAL}/expenses/${expenseId}/groups/${groupId}`, {
        headers: {
          host: HOST.EXPENSE_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: [`/expenses/${expenseId}/groups/${groupId}`],
      });
      queryClient.removeQueries({
        queryKey: [`/activities/groups/${groupId}`],
        exact: false,
      });

      router.navigate('/groups');
    },
    onError: () => {
      router.replace(`/expenses/${expenseId}/error-modal`);
    },
  });
}
