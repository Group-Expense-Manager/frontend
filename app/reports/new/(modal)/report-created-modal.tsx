import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function ReportCreatedModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Report created')}
      description={t('Report created - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.navigate('/create'),
      }}
    />
  );
}
