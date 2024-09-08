import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import { ButtonType } from '@/util/ButtonType';

export default function ExitWithoutSavingModal() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <DoubleButtonPopover
      title={t('Unsaved Changes')}
      description={t('Unsaved Changes - description')}
      firstButtonProps={{
        title: t('Discard Changes'),
        onPress: () => {
          router.navigate('/you');
        },
      }}
      secondButtonProps={{
        title: t(`Keep Editing`),
        onPress: () => {
          router.back();
        },
        type: ButtonType.OUTLINED,
      }}
    />
  );
}
