import { Stack } from 'expo-router';
import React from 'react';

import { GroupUpdateProvider } from '@/context/group/GroupUpdateContext';

export default function GroupDataLayout() {
  return (
    <GroupUpdateProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GroupUpdateProvider>
  );
}
