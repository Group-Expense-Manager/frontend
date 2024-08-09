import { Stack } from 'expo-router';
import React from 'react';

const StepperLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(group-creation)" options={{ headerShown: false }} />
      <Stack.Screen name="(expense-creation)" options={{ headerShown: false }} />
      <Stack.Screen name="(password-change)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default StepperLayout;
