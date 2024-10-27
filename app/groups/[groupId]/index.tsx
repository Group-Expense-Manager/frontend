import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton, { ButtonColor } from '@/components/ui/button/CustomButton';
import InfoCard from '@/components/ui/card/InfoCard';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useGroup from '@/hooks/group/UseGroup';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';
import { getNameFromUserDetails } from '@/util/GetName';

export default function GroupSettings() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ groupId: string }>();

  const { authState } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(params.groupId);
  const { data: ownerDetails } = useGroupMemberDetails(params.groupId, groupDetails?.ownerId);
  const { data: groupPicture } = useGroupPicture(params.groupId, groupDetails?.attachmentId);

  const [author, setAuthor] = useState('');

  useLayoutEffect(() => {
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
        {authState.userId === groupDetails?.ownerId && (
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/groups/${params.groupId}/delete-group-modal`)}
              title={t('Delete group')}
              color={ButtonColor.RED}
              type={ButtonType.OUTLINED}
            />
          </View>
        )}
      </View>
    </Box>
  );
}
