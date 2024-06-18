import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, GestureResponderEvent, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { GroupCreationContext, GroupCreationProps } from '@/context/GroupCreationContext';
import useGroupCreation from '@/hooks/group/UseGroupCreation';

export default function GroupAccept() {
  const { t } = useTranslation();
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    handleSwitchChange();
  };

  const createGroup = useGroupCreation();

  const handleCreateGroup = (groupCreationProps: GroupCreationProps) => {
    console.log('titaj');
    return () => {
      createGroup(groupCreationProps);
    };
  };
  const handleSwitchChange = () => {
    setGroupCreationProps({
      name: groupCreationProps.name,
      acceptRequired: isEnabled,
      groupCurrencies: groupCreationProps.groupCurrencies,
      attachmentId: groupCreationProps.attachmentId,
    });
  };

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <View className=" w-full  flex flex-row justify-between items-center">
              <Text className="text-center text-regular">{t('Acceptance required')}</Text>
              <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={handleCreateGroup(groupCreationProps)}
                title={t('Create group')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(group-creation)/group-currency')}
                title={t('Back')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
