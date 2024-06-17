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
    queryFn: async (): Promise<Expenses> => {
      console.log('groupId', groupId);

      const { data } = await axios.get(`${API_URL}/external/expenses?groupId=${groupId}`, {
        headers: {
          host: 'gem.web.expense-manager.com',
          accept: 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    enabled: !!groupId,
  });
}

export default useExpenses;
