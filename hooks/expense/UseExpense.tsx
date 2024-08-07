import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Expense = {
  creatorId: string;
  title: string;
  cost: number;
  baseCurrency: string;
  targetCurrency: string | undefined;
  exchangeRate: number | undefined;
  createdAt: Date;
  updatedAt: Date;
  expenseDate: Date;
  attachmentId: undefined;
  expenseParticipants: ExpenseParticipant[];
  status: string;
  statusHistory: StatusHistoryEntry[];
};

export type ExpenseParticipant = {
  participantId: string;
  participantCost: number;
  participantStatus: string;
};

export type StatusHistoryEntry = {
  participantId: string;
  expenseAction: string;
  createdAt: Date;
  comment: string | undefined;
};

function useExpense(expenseId: string, groupId: string) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`expenses/${expenseId}/${groupId}`],
    queryFn: async (): Promise<Expense> => {
      const { data } = await axios.get(
        `${API_URL}/external/expenses/${expenseId}/groups/${groupId}`,
        {
          headers: {
            host: 'gem.web.expense-manager.com',
            accept: 'application/vnd.gem.internal.v1+json',
            authorization: `Bearer ${authState.token}`,
          },
        },
      );

      return data;
    },
  });
}

export default useExpense;
