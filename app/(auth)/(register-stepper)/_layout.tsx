import { Stack } from 'expo-router';
import React from 'react';

import { RegistrationProvider } from '@/context/auth/RegistrationContext';
export default function RegistrationLayout() {
  return (
    <RegistrationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </RegistrationProvider>
  );
}
