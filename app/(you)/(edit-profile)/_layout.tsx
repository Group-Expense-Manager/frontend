import { Stack } from 'expo-router';
import React from 'react';

import { ProfileEditionProvider } from '@/context/userdetails/ProfileUpdateContext';

export default function ProfileEditionLayout() {
  return (
    <ProfileEditionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProfileEditionProvider>
  );
}
