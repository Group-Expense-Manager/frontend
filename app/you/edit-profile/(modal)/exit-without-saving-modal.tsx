import { router } from 'expo-router';
import React from 'react';

import ExitWithoutSavingPopover from '@/components/ui/popover/ExitWithoutSavingPopover';

export default function ExitWithoutSavingModal() {
  return <ExitWithoutSavingPopover onDiscardChanges={() => router.navigate('/you')} />;
}
