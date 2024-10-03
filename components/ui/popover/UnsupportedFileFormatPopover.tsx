import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function UnsupportedFileFormatPopover() {
  const { t } = useTranslation();

  return (
    <SingleButtonPopover
      title={t('Unsupported File Format')}
      description={t('Unsupported File Format - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.back(),
      }}
    />
  );
}
