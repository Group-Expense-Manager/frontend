import { Stack } from 'expo-router';
import React from 'react';

const GroupCreationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="single"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="multi"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default GroupCreationLayout;
