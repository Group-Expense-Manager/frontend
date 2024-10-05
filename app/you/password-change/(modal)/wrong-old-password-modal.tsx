import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function WrongOldPasswordModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Incorrect old password')}
      description={t('Incorrect old password - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
