import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import InfoCard from '@/components/ui/card/InfoCard';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useGroup from '@/hooks/group/UseGroup';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getNameFromUserDetails } from '@/util/GetName';

export default function GroupSettings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ groupId: string }>();

  const { data: groupDetails } = useGroup(params.groupId);
  const { data: ownerDetails } = useGroupMemberDetails(params.groupId, groupDetails?.ownerId);
  const { data: groupPicture } = useGroupPicture(params.groupId, groupDetails?.attachmentId);

  const [author, setAuthor] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Settings')} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (ownerDetails) {
      setAuthor(getNameFromUserDetails(ownerDetails));
    }
  }, [ownerDetails]);

  return (
    <Box>
      <View className="w-full h-full flex-col space-y-8">
        <View className="h-32 justify-center">
          <View>
            {groupDetails ? (
              <InfoCard
                image={groupPicture}
                title={groupDetails.name}
                details={`${t('author')}: ${author}`}
              />
            ) : (
              <Loader />
            )}
          </View>
        </View>
        <View className="w-full">
          <CustomButton
            onPress={() => router.push(`/groups/${params.groupId}/details`)}
            title={t('Group data')}
          />
        </View>
        <View className="w-full">
          <CustomButton
            onPress={() => router.push(`/groups/${params.groupId}/members`)}
            title={t('List of members')}
          />
        </View>
        <View className="w-full">
          <CustomButton
            onPress={() => router.push(`/groups/${params.groupId}/join-group-code-modal`)}
            title={t('Join code')}
          />
        </View>
      </View>
    </Box>
  );
}
