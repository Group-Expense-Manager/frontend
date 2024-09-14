import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import ErrorPopover from '@/components/ui/popover/ErrorPopover';

export default function ErrorModal() {
  const params = useLocalSearchParams<{ groupId: string }>();
  return <ErrorPopover onPress={() => router.navigate(`/groups/${params.groupId}`)} />;
}
