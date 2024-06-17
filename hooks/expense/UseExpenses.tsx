import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupContext } from '@/context/GroupContext';
import { Groups } from '@/hooks/group/UseGroups';

export type ExpenseListElement = {
  expenseId: string;
  creatorId: string;
  title: string;
  cost: number;
  baseCurrency: string;
  status: string;
  participantIds: string[];
  expenseDate: Date;
};

export type Expenses = {
  expenses: ExpenseListElement[];
};

function useExpenses(groupId: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`expenses?groupId=${groupId}`],
    queryFn: async (): Promise<Groups> => {
      console.log('groupId', groupId);

      const { data } = await axios.get(`${API_URL}/external/expenses?groupId=${groupId}`, {
        headers: {
          host: 'gem.web.group-expense.com',
          'content-type': 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    enabled: !!groupId,
  });
  //   const mutation = useMutation({
  //     mutationFn: (groupId: string) => {
  //       return axios.get(`${API_URL}/external/expenses?groupId=${groupId}`, {
  //         headers: {
  //           host: 'gem.web.expense-manager.com',
  //           'content-type': 'application/vnd.gem.internal.v1+json',
  //           authorization: `Bearer ${authState.token}`,
  //         },
  //       });
  //     },
  //     onSuccess: (response: AxiosResponse) => {
  //       console.log(JSON.stringify(response?.data));
  //     },
  //     onError: (error: AxiosError) => {
  //       console.log(error.response?.status);
  //       console.log(JSON.stringify(error.response?.data));
  //     },
  //   });
  //
  //   return (groupId: string) => {
  //     return mutation.mutate(groupId);
  //   };
}

export default useExpenses;
