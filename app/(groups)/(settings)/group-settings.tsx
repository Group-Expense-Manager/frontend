import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import InfoCard from '@/components/ui/card/InfoCard';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { GroupContext } from '@/context/group/GroupContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useGroup from '@/hooks/group/UseGroup';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getNameFromUserDetails } from '@/util/GetName';

export default function GroupSettings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { group } = useContext(GroupContext);

  const { data: ownerDetails } = useGroupMemberDetails(group.groupId, group.ownerId);
  const { data: groupPicture } = useGroupPicture(group.groupId, group.attachmentId);
  useGroup(group.groupId);

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
        <View className="py-8">
          <InfoCard
            image={!groupPicture ? { uri: '' } : groupPicture}
            title={group.name}
            details={`${t('author')}: ${author}`}
          />
        </View>
        <View className="w-full">
          <CustomButton onPress={() => {}} title={t('Group data')} />
        </View>
        <View className="w-full">
          <CustomButton
            onPress={() => {
              router.push('/group-members');
            }}
            title={t('List of members')}
          />
        </View>
        <View className="w-full">
          <CustomButton
            onPress={() => {
              router.push('/join-group-code-modal');
            }}
            title={t('Join code')}
          />
        </View>
      </View>
    </Box>
  );
}
