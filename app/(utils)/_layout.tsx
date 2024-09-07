import { Stack } from 'expo-router';
import React from 'react';

const UtilsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(select)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default UtilsLayout;
