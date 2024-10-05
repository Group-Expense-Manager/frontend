import { Stack } from 'expo-router';
import React from 'react';

import { PasswordChangeProvider } from '@/context/auth/PasswordChangeContext';

export default function PasswordChangeLayout() {
  return (
    <PasswordChangeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PasswordChangeProvider>
  );
}
