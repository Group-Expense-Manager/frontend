import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReportCreationProvider } from '@/context/report/ReportCreationContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';

const NewReportLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <ReportCreationProvider>
        <SelectInputProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SelectInputProvider>
      </ReportCreationProvider>
    </SafeAreaView>
  );
};
export default NewReportLayout;
