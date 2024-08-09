import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CustomPopover from '@/components/ui/popover/CustomPopover';

export default function VerificationEmailAlreadySentModal() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <CustomPopover
      title={t('Verification email already sent')}
      description={t('Verification email already sent - description')}
      buttonTitle={t('OK')}
      onPress={() => router.back()}
    />
  );
}
