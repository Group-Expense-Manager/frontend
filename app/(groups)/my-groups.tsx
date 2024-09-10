import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import GroupInfoCard from '@/components/modules/groups/GroupInfoCard';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { GlobalContext } from '@/context/GlobalContext';

export default function MyGroups() {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('My groups')} />,
    });
  }, [navigation]);

  return (
    <Box>
      <View className="w-full h-full flex-col justify-between pb-8 space-y-8">
        <ScrollView className="flex flex-col space-y-2">
          {userData.userGroups.map((group) => (
            <View key={group.groupId}>
              <GroupInfoCard group={group} />
            </View>
          ))}
        </ScrollView>
        <View className="w-full y space-y-8">
          <View className="w-full">
            <CustomButton onPress={() => {}} title={t('Create group')} />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => {
                router.push('/join-group-modal');
              }}
              title={t('Join group')}
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
