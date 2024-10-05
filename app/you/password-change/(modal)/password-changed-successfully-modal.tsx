import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function PasswordChangedSuccessfullyModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Success')}
      description={t('Password changed successfully')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.navigate('/you'),
      }}
    />
  );
}
