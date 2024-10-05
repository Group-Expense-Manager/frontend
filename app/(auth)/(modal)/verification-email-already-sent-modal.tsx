import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function VerificationEmailAlreadySentModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Verification email already sent')}
      description={t('Verification email already sent - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
