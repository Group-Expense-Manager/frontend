import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function PasswordRecoveryEmailSentModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Password reset')}
      description={t('Password recovery email sent - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
