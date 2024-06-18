import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { GroupCreationContext } from '@/context/GroupCreationContext';

export default function GroupName() {
  const { t } = useTranslation();
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);
  const [groupName, setGrouName] = useState('');

  useEffect(() => {
    setGroupCreationProps({
      name: groupName,
      acceptRequired: groupCreationProps.acceptRequired,
      groupCurrencies: groupCreationProps.groupCurrencies,
      attachmentId: groupCreationProps.attachmentId,
    });
  }, [groupName]);

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
            <View>
              <CustomTextInput
                label={t('Group name')}
                onChangeText={setGrouName}
                value={groupName}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(group-creation)/group-currency')}
                title={t('Next')}
              />
            </View>
            <View className="w-full">
              <CustomButton onPress={() => router.navigate('(tabs)/groups')} title={t('Cancel')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
