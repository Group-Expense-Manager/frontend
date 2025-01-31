import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectInputProvider } from '@/context/utils/SelectInputContext';

export default function TabsGroupsLayout() {
  return (
    <SafeAreaView className="flex-1">
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </SafeAreaView>
  );
}
