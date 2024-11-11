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
import { Expense } from '@/hooks/expense/UseExpense';

export default function useCreateExpense() {
  const { authState, userData, setUserData } = useContext(GlobalContext);
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
          amount: {
            value: expenseCreation.totalCost.toNumber(),
            currency: expenseCreation.baseCurrency.code,
          },
          targetCurrency: expenseCreation.targetCurrency?.code,
          expenseDate: expenseCreation.expenseDate,
          expenseParticipants: expenseCreation.expenseParticipants
            .filter((participant) => participant.participantId !== authState.userId)
            .map((participant) => ({
              participantId: participant.participantId,
              participantCost: getParticipantCost(participant),
            })),
          attachmentId: expenseCreation.attachmentId,
          message: expenseCreation.message,
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
      queryClient.setQueryData(
        [`/expenses/${response.data.expenseId}/groups/${expenseCreation.groupId}`],
        () => {
          return response.data;
        },
      );

      queryClient.removeQueries({
        queryKey: [`/activities/groups/${expenseCreation.groupId}`],
        exact: false,
      });
      setUserData({ ...userData, currentGroupId: expenseCreation.groupId });
      router.navigate('/groups');
      router.push(`/expenses/${response.data.expenseId}`);
    },
    onError: () => {
      router.push('/expenses/new/error-modal');
    },
  });
}
