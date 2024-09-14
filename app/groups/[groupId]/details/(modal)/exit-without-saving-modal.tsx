import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import ExitWithoutSavingPopover from '@/components/ui/popover/ExitWithoutSavingPopover';

export default function ExitWithoutSavingModal() {
  const params = useLocalSearchParams<{ groupId: string }>();
  return (
    <ExitWithoutSavingPopover
      onDiscardChanges={() => router.navigate(`/groups/${params.groupId}`)}
    />
  );
}
