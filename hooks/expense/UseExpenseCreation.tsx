import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseCreationProps } from '@/context/expense/ExpenseCreationContext';

function useExpenseCreation(): (expenseCreationProps: ExpenseCreationProps) => void {
  const { authState } = useContext(GlobalContext);

  const mutation = useMutation({
    mutationFn: (expenseCreationProps: ExpenseCreationProps) => {
      const { groupId, ...rest } = expenseCreationProps;
      const requestBody = Object.fromEntries(
        Object.entries(rest)
          .filter(([_, value]) => value !== undefined)
          .filter(([_, value]) => typeof value !== 'string' || value !== ''),
      );
      return axios.post(`${API_URL}/external/expenses?groupId=${groupId}`, requestBody, {
        headers: {
          host: 'gem.web.expense-manager.com',
          'content-type': 'application/vnd.gem.internal.v1+json',
          accept: 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: () => {
      router.replace('/(tabs)/groups');
    },
    onError: (error: AxiosError) => {
      alert(`Niepoprawne dane ${error.response?.status}`);
    },
  });

  return (expenseCreationProps: ExpenseCreationProps) => {
    mutation.mutate(expenseCreationProps);
  };
}

export default useExpenseCreation;
