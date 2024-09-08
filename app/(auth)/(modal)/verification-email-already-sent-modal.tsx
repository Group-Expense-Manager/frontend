import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

export default function VerificationEmailAlreadySentModal() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
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
