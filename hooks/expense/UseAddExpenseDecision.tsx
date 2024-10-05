import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { Expense } from '@/hooks/expense/UseExpense';

export interface ExpenseDecision {
  expenseId: string;
  groupId: string;
  decision: 'ACCEPT' | 'REJECT';
  message?: string;
}

export default function useAddExpenseDecision(expenseDecision: ExpenseDecision) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}${PATHS.EXTERNAL}/expenses/decide`, expenseDecision, {
        headers: {
          host: HOST.EXPENSE_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: async (response: AxiosResponse<Expense>) => {
      queryClient.setQueryData(
        [`/expenses/${expenseDecision.expenseId}/groups/${expenseDecision.groupId}`],
        () => {
          return response.data;
        },
      );

      await queryClient.invalidateQueries({
        queryKey: [`/activities/groups/${expenseDecision.groupId}`],
      });

      router.back();
    },
    onError: () => {
      router.replace(`/expenses/${expenseDecision.expenseId}/error-modal`);
    },
  });
}
