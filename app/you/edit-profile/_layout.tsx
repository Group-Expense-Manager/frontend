import { Stack } from 'expo-router';
import React from 'react';

import { ProfileUpdateProvider } from '@/context/userdetails/ProfileUpdateContext';

export default function ProfileEditionLayout() {
  return (
    <ProfileUpdateProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProfileUpdateProvider>
  );
}
