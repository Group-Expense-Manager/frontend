import { useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';

import GroupMemberInfoCard from '@/components/modules/groups/GroupMemberInfoCard';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { GroupContext } from '@/context/group/GroupContext';
import useGroupMembersDetails from '@/hooks/userdetails/UseGroupMembersDetails';

export default function GroupSettings() {
  const osName = Platform.OS;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { group } = useContext(GroupContext);
  const { data: groupMembersDetails } = useGroupMembersDetails(group.groupId);

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
                <GroupMemberInfoCard member={member} isOwner={member.id === group.ownerId} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <ActivityIndicator animating color="#E3E5E5" size={osName === 'ios' ? 'large' : 50} />
        )}
      </View>
    </Box>
  );
}
