import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function WrongCredentialsModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Incorrect credentials')}
      description={t('Incorrect credentials - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
