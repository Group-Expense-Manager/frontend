import { Stack } from 'expo-router';
import React from 'react';

import { VerificationProvider } from '@/context/auth/VerificationContext';

export default function AuthLayout() {
  return (
    <VerificationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </VerificationProvider>
  );
}
