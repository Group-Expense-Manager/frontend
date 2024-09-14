import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import Loader from '@/components/ui/loader/Loader';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import useGroup from '@/hooks/group/UseGroup';
import { ButtonType } from '@/util/ButtonType';

export default function JoinGroupCodeModal() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ groupId: string }>();
  const { data: groupDetails } = useGroup(params.groupId);

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);

  function copy() {
    if (groupDetails) {
      Clipboard.setStringAsync(groupDetails.joinCode).then(() => router.back());
    }
  }

  return (
    <DoubleButtonPopover
      title={t('Join group code')}
      description={t('Join group code - description')}
      middleSection={
        groupDetails ? (
          <Text selectable className="text-primary-base text-title2 text-center">
            {groupDetails.joinCode}
          </Text>
        ) : (
          <Loader />
        )
      }
      firstButtonProps={{
        title: t('Copy'),
        onPress: copy,
        disabled: !groupDetails,
      }}
      secondButtonProps={{
        title: t('Cancel'),
        onPress: () => router.back(),
        type: ButtonType.OUTLINED,
      }}
    />
  );
}
