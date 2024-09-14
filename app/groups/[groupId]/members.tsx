import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import GroupMemberInfoCard from '@/components/modules/groups/GroupMemberInfoCard';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import useGroup from '@/hooks/group/UseGroup';
import useGroupMembersDetails from '@/hooks/userdetails/UseGroupMembersDetails';

export default function GroupMembers() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ groupId: string }>();
  const { data: groupDetails } = useGroup(params.groupId);
  const { data: groupMembersDetails } = useGroupMembersDetails(params.groupId);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Members')} />,
    });
  }, [navigation]);

  return (
    <Box>
      <View className="w-full h-full flex-col space-y-8">
        {groupMembersDetails ? (
          <ScrollView className="flex flex-col space-y-2">
            {groupMembersDetails.details.map((member) => (
              <View key={member.id}>
                <GroupMemberInfoCard
                  member={member}
                  isOwner={member.id === groupDetails?.ownerId}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Loader />
        )}
      </View>
    </Box>
  );
}
