import { Stack } from 'expo-router';
import React from 'react';

import { GroupCreationProvider } from '@/context/GroupCreationContext';

const JoinGroupLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="join-group"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default JoinGroupLayout;
