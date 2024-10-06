import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { Amount, FxData } from '@/hooks/payment/UsePayment';

export type Expense = {
  expenseId: string;
  creatorId: string;
  title: string;
  amount: Amount;
  fxData?: FxData;
  createdAt: Date;
  updatedAt: Date;
  expenseDate: string;
  attachmentId?: string;
  expenseParticipants: ExpenseParticipant[];
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  history: ExpenseHistoryEntry[];
};

export type ExpenseParticipant = {
  participantId: string;
  participantCost: number;
  participantStatus: 'ACCEPTED' | 'REJECTED' | 'PENDING';
};

export type ExpenseHistoryEntry = {
  participantId: string;
  expenseAction: 'CREATED' | 'EDITED' | 'DELETED' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  comment?: string;
};

export default function useExpense(expenseId: string) {
  const { authState, userData } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/expenses/${expenseId}/groups/${userData.currentGroupId}`],
    queryFn: async (): Promise<Expense> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/expenses/${expenseId}/groups/${userData.currentGroupId}`,
        {
          headers: {
            host: HOST.EXPENSE_MANAGER,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );

      return data;
    },
  });
}
