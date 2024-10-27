import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonColor } from '@/components/ui/button/CustomButton';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import useDeleteGroup from '@/hooks/group/UseDeleteGroup';
import { ButtonType } from '@/util/ButtonType';

export default function ErrorModal() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ groupId: string }>();
  const { mutate: deleteGroup, isPending: isDeletionPending } = useDeleteGroup(params.groupId);

  return (
    <DoubleButtonPopover
      title={t('Delete group - title')}
      description={t('Delete group - description')}
      firstButtonProps={{
        title: t('Yes, delete'),
        color: ButtonColor.RED,
        onPress: deleteGroup,
      }}
      secondButtonProps={{
        title: t(`No, cancel`),
        onPress: () => router.back(),
        type: ButtonType.OUTLINED,
      }}
      isLoading={isDeletionPending}
    />
  );
}
