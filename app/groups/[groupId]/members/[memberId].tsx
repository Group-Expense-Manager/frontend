import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import GroupMemberInfo from '@/components/modules/userdetails/GroupMemberInfo';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';

export default function GroupMemberDetails() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ groupId: string; memberId: string }>();

  const { data: groupMemberDetails } = useGroupMemberDetails(params.groupId, params.memberId);
  const { data: profilePicture } = useProfilePicture(
    params.memberId,
    groupMemberDetails?.attachmentId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Member')} />,
    });
  }, [navigation]);

  return (
    <Box>
      <View className="w-full h-full flex-col space-y-8">
        {groupMemberDetails && profilePicture ? (
          <GroupMemberInfo
            groupMemberDetails={groupMemberDetails}
            profilePicture={profilePicture}
          />
        ) : (
          <Loader />
        )}
      </View>
    </Box>
  );
}
