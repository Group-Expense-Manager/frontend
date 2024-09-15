import { Stack } from 'expo-router';
import React from 'react';

import { GroupUpdateProvider } from '@/context/group/GroupUpdateContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';

export default function GroupDataLayout() {
  return (
    <SelectInputProvider>
      <GroupUpdateProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GroupUpdateProvider>
    </SelectInputProvider>
  );
}
