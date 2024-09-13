import * as Clipboard from 'expo-clipboard';
import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Platform, Text } from 'react-native';

import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import { GroupContext } from '@/context/group/GroupContext';
import useGroup from '@/hooks/group/UseGroup';
import { ButtonType } from '@/util/ButtonType';

export default function JoinGroupCodeModal() {
  const osName = Platform.OS;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { group } = useContext(GroupContext);
  const { data: groupDetails } = useGroup(group.groupId);
  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
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
          <ActivityIndicator animating color="#E3E5E5" size={osName === 'ios' ? 'large' : 50} />
        )
      }
      firstButtonProps={{
        title: t('Copy'),
        onPress: async () => {
          if (groupDetails) {
            await Clipboard.setStringAsync(groupDetails.joinCode);
            router.back();
          }
        },
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
