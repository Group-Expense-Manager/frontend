import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { ExpenseCreationProps } from '@/context/ExpenseCreationContext';
import { GlobalContext } from '@/context/GlobalContext';

function useExpenseCreation(): (expenseCreationProps: ExpenseCreationProps) => void {
  const { authState } = useContext(GlobalContext);

  const mutation = useMutation({
    mutationFn: (expenseCreationProps: ExpenseCreationProps) => {
      console.log(expenseCreationProps);
      const { groupId, ...rest } = expenseCreationProps;
      const requestBody = Object.fromEntries(
        Object.entries(rest)
          .filter(([_, value]) => value !== undefined)
          .filter(([_, value]) => typeof value !== 'string' || value !== ''),
      );
      console.log(requestBody);

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
      console.log(error.response?.status);
      console.log(JSON.stringify(error.response?.data));
    },
  });

  return (expenseCreationProps: ExpenseCreationProps) => {
    mutation.mutate(expenseCreationProps);
  };
}

export default useExpenseCreation;
