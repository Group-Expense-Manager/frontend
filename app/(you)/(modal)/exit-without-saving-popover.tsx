import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CustomDecisionPopover from '@/components/ui/popover/CustomDecisionPopover';

export default function ExitWithoutSavingPopover() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <CustomDecisionPopover
      title={t('Unsaved Changes')}
      description={t('Unsaved Changes - description')}
      buttonTitle={t('Discard Changes')}
      onPress={() => {
        router.navigate('/you');
      }}
      label={t('Email')}
      secondButtonTitle={t(`Keep Editing`)}
      secondOnPress={() => {
        router.back();
      }}
      isPending={false}
      onChangeText={() => {}}
    />
  );
}
