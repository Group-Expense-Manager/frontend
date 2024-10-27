import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function ErrorModal() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Can not delete group!')}
      description={t('Can not delete group! - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
