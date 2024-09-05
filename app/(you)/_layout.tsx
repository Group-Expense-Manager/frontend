import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileEditionProvider } from '@/context/userdetails/ProfileUpdateContext';

export default function YouLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileEditionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ProfileEditionProvider>
    </SafeAreaView>
  );
}
