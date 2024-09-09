import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectInputProvider } from '@/context/utils/SelectInputContext';

export default function YouLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
