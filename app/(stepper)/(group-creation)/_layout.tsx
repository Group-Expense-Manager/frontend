import { Stack } from 'expo-router';
import React from 'react';

import { GroupCreationProvider } from '@/context/group/GroupCreationContext';

const GroupCreationLayout = () => {
  return (
    <GroupCreationProvider>
      <Stack>
        <Stack.Screen
          name="group-name"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="group-currency"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="group-accept"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GroupCreationProvider>
  );
};
export default GroupCreationLayout;
