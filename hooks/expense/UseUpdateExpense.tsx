import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Decimal from 'decimal.js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseParticipant } from '@/context/expense/ExpenseCreationContext';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import { Expense } from '@/hooks/expense/UseExpense';

export default function useUpdateExpense(groupId: string, expenseId: string) {
  const { authState } = useContext(GlobalContext);
  const { expenseUpdate } = useContext(ExpenseUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      function getParticipantCost(participant: ExpenseParticipant): number {
        if (expenseUpdate.divisionType === 'cost') {
          return participant.participantCost.toNumber();
        } else {
          const sumOfWeights = expenseUpdate.expenseParticipants.reduce(
            (accumulator, currentValue) => currentValue.participantCost.add(accumulator),
            new Decimal(0),
          );

          return participant.participantCost
            .dividedBy(sumOfWeights)
            .times(expenseUpdate.totalCost)
            .toDecimalPlaces(2, Decimal.ROUND_DOWN)
            .toNumber();
        }
      }
      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/expenses/${expenseId}/groups/${groupId}`,
        {
          title: expenseUpdate.title,
          amount: {
            value: expenseUpdate.totalCost,
            currency: expenseUpdate.baseCurrency.code,
          },
          targetCurrency: expenseUpdate.targetCurrency?.code,
          expenseDate: expenseUpdate.expenseDate,
          expenseParticipants: expenseUpdate.expenseParticipants
            .filter((participant) => participant.participantId !== authState.userId)
            .map((participant) => ({
              participantId: participant.participantId,
              participantCost: getParticipantCost(participant),
            })),
          message: expenseUpdate.message,
          attachmentId: expenseUpdate.newAttachmentId,
        },
        {
          headers: {
            host: HOST.EXPENSE_MANAGER,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<Expense>) => {
      queryClient.setQueryData([`/expenses/${response.data.expenseId}/groups/${groupId}`], () => {
        return response.data;
      });
      queryClient.removeQueries({
        queryKey: [`/activities/groups/${groupId}`],
        exact: false,
      });
      router.navigate(`/expenses/${expenseId}`);
    },
    onError: () => {
      router.push(`/expenses/${expenseId}/edit/error-modal`);
    },
  });
}
