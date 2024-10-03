import { Stack } from 'expo-router';
import React from 'react';

import { GroupCreationProvider } from '@/context/group/GroupCreationContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';

export default function GroupCreationLayout() {
  return (
    <GroupCreationProvider>
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </GroupCreationProvider>
  );
}
