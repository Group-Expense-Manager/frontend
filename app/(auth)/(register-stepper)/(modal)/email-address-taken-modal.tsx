import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function EmailAddressTakenModal() {
  const { t } = useTranslation();
  return (
    <SingleButtonPopover
      title={t('Email address taken')}
      description={t('Email address taken - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
