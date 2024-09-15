import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

const SuccessfullyJoinedGroupPopover = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <SingleButtonPopover
      title={t('Successfully joined group')}
      description={t('Successfully joined group - description')}
      buttonProps={{
        title: t('OK'),
        onPress: () => router.navigate('/groups'),
      }}
    />
  );
};

export default SuccessfullyJoinedGroupPopover;
