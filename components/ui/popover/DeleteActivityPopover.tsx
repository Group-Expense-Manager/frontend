import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonColor } from '@/components/ui/button/CustomButton';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import { ButtonType } from '@/util/ButtonType';

interface DeleteActivityProps {
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteActivityPopover: React.FC<DeleteActivityProps> = ({
  title,
  description,
  onConfirm,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <DoubleButtonPopover
      title={title}
      description={description}
      firstButtonProps={{
        title: t('Yes, delete'),
        color: ButtonColor.RED,
        onPress: onConfirm,
      }}
      secondButtonProps={{
        title: t(`No, cancel`),
        onPress: () => router.back(),
        type: ButtonType.OUTLINED,
      }}
      isLoading={isLoading}
    />
  );
};

export default DeleteActivityPopover;
