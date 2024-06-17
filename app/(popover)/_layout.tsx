import { Stack } from 'expo-router';
import React from 'react';

const PopoverLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(join-group)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default PopoverLayout;
