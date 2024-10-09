import Decimal from 'decimal.js';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext } from 'react';

import Box from '@/components/ui/box/Box';
import { ImageBase64 } from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseParticipant } from '@/context/expense/ExpenseCreationContext';
import { ExpenseUpdate, ExpenseUpdateProvider } from '@/context/expense/ExpenseUpdateContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useExpense, { Expense } from '@/hooks/expense/UseExpense';

const EditExpenseLayout = () => {
  const params = useLocalSearchParams<{ expenseId: string }>();
  const { userData } = useContext(GlobalContext);

  const { data: expense } = useExpense(params.expenseId);
  const { data: attachment } = useGroupPicture(userData.currentGroupId!, expense?.attachmentId);

  const creatorAsParticipant = (expense: Expense): ExpenseParticipant => {
    return {
      participantId: expense?.creatorId,
      participantCost: new Decimal(expense.amount.value)
        .minus(
          new Decimal(
            expense.expenseParticipants.reduce(
              (accumulator, currentValue) =>
                accumulator.add(new Decimal(currentValue.participantCost)),
              new Decimal(0),
            ),
          ),
        )
        .toDecimalPlaces(2, Decimal.ROUND_DOWN),
    };
  };

  function getParticipants(expense: Expense): ExpenseParticipant[] {
    const participants = expense.expenseParticipants.map((participant) => ({
      participantId: participant.participantId,
      participantCost: new Decimal(participant.participantCost),
    }));
    return [creatorAsParticipant(expense), ...participants];
  }

  function getUpdate(expense: Expense, attachment?: ImageBase64): ExpenseUpdate {
    return {
      title: expense.title,
      totalCost: new Decimal(expense.amount.value),
      baseCurrency: { code: expense.amount.currency },
      targetCurrency: expense.fxData?.targetCurrency
        ? { code: expense.fxData?.targetCurrency }
        : undefined,
      expenseDate: new Date(expense.expenseDate),
      expenseParticipants: getParticipants(expense),
      divisionType: 'cost',
      oldAttachment: attachment,
      newAttachment: attachment,
      newAttachmentId: expense.attachmentId,
      oldAttachmentId: expense.attachmentId,
    };
  }

  return !!expense && (!expense.attachmentId || !!attachment) ? (
    <ExpenseUpdateProvider update={getUpdate(expense, attachment)}>
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </ExpenseUpdateProvider>
  ) : (
    <Box>
      <Loader />
    </Box>
  );
};
export default EditExpenseLayout;
