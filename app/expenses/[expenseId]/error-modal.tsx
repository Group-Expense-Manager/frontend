import { router } from 'expo-router';
import React from 'react';

import ErrorPopover from '@/components/ui/popover/ErrorPopover';

export default function ErrorModal() {
  return <ErrorPopover onPress={() => router.navigate('/groups')} />;
}
