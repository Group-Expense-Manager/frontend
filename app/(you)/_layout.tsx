import { Stack } from 'expo-router';
import React from 'react';

export default function YouLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
