import { Stack } from 'expo-router';
import React from 'react';

import { ExpenseCreationProvider } from '@/context/expense/ExpenseCreationContext';

const ExpenseCreationLayout = () => {
  return (
    <ExpenseCreationProvider>
      <Stack>
        <Stack.Screen
          name="expense-group"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-title"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-date"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-currency"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-cost"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-participants"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-cost-division"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expense-message"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ExpenseCreationProvider>
  );
};
export default ExpenseCreationLayout;
