import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import { ButtonType } from '@/util/ButtonType';

interface ExitWithoutSavingProps {
  onDiscardChanges: () => void;
}

const ExitWithoutSavingPopover: React.FC<ExitWithoutSavingProps> = ({ onDiscardChanges }) => {
  const { t } = useTranslation();

  return (
    <DoubleButtonPopover
      title={t('Unsaved Changes')}
      description={t('Unsaved Changes - description')}
      firstButtonProps={{
        title: t('Discard Changes'),
        onPress: onDiscardChanges,
      }}
      secondButtonProps={{
        title: t(`Keep Editing`),
        onPress: () => router.back(),
        type: ButtonType.OUTLINED,
      }}
    />
  );
};

export default ExitWithoutSavingPopover;
