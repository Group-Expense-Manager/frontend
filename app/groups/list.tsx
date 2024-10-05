import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import GroupInfoCard from '@/components/modules/groups/GroupInfoCard';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import useGroups from '@/hooks/group/UseGroups';

export default function List() {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const { data: groups } = useGroups();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('My groups')} />,
    });
  }, [navigation]);

  return (
    <Box>
      <View className="w-full h-full flex-col justify-between pb-8 space-y-8">
        {groups ? (
          <ScrollView className="flex flex-col space-y-2">
            {groups.map((group) => (
              <View key={group.groupId}>
                <GroupInfoCard groupId={group.groupId} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Loader />
        )}

        <View className="w-full y space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/groups/new/group-name')}
              title={t('Create group')}
            />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/groups/join-group-modal')}
              title={t('Join group')}
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
