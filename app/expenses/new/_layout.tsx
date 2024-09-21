import { Stack } from 'expo-router';
import React from 'react';

import { ExpenseCreationProvider } from '@/context/expense/ExpenseCreationContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';

const NewExpenseLayout = () => {
  return (
    <ExpenseCreationProvider>
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </ExpenseCreationProvider>
  );
};
export default NewExpenseLayout;
