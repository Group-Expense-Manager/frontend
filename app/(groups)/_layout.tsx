import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupProvider } from '@/context/group/GroupContext';

export default function GroupsLayout() {
  return (
    <GroupProvider>
      <SafeAreaView className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </GroupProvider>
  );
}
