import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Decimal from 'decimal.js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import {
  ExpenseCreationContext,
  ExpenseParticipant,
} from '@/context/expense/ExpenseCreationContext';
import { ExpenseDetails } from '@/hooks/expense/UseExpense';

export default function useCreateExpense() {
  const { authState } = useContext(GlobalContext);
  const { expenseCreation } = useContext(ExpenseCreationContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      function getParticipantCost(participant: ExpenseParticipant): number {
        if (expenseCreation.divisionType === 'cost') {
          return participant.participantCost.toNumber();
        } else {
          const sumOfWeights = expenseCreation.expenseParticipants.reduce(
            (accumulator, currentValue) => currentValue.participantCost.add(accumulator),
            new Decimal(0),
          );

          return participant.participantCost
            .dividedBy(sumOfWeights)
            .times(expenseCreation.totalCost)
            .toDecimalPlaces(2, Decimal.ROUND_DOWN)
            .toNumber();
        }
      }

      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/expenses?groupId=${expenseCreation.groupId}`,
        {
          title: expenseCreation.title,
          totalCost: expenseCreation.totalCost.toNumber(),
          baseCurrency: expenseCreation.baseCurrency.code,
          targetCurrency: expenseCreation.targetCurrency?.code,
          expenseDate: expenseCreation.expenseDate,
          expenseParticipants: expenseCreation.expenseParticipants
            .filter((participant) => participant.participantId !== authState.userId)
            .map((participant) => ({
              participantId: participant.participantId,
              participantCost: getParticipantCost(participant),
            })),
          attachmentId: expenseCreation.attachmentId,
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
    onSuccess: (response: AxiosResponse<ExpenseDetails>) => {
      queryClient.setQueryData([`/expenses?groupId=${expenseCreation.groupId}`], () => {
        return response.data;
      });

      router.navigate('/groups');
    },
    onError: () => {
      router.push('/expenses/new/error-modal');
    },
  });
}
