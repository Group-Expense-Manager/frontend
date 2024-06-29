import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import useJoinGroup from '@/hooks/group/UseJoinGroup';

export default function JoinGroup() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const { mutate } = useJoinGroup(code);

  const handleJoinGroup = async () => {
    mutate();
  };

  return (
    <SafeView>
      {/*<Text className=" text-center font-bold">{t('Join group')}</Text>*/}
      {/*<TextInput*/}
      {/*  placeholder={t('Code')}*/}
      {/*  secureTextEntry*/}
      {/*  onChangeText={(text: string) => setCode(text)}*/}
      {/*  value={code}*/}
      {/*/>*/}
      {/*<Button onPress={handleJoinGroup} title={t('Join')} />*/}
      {/*<Button onPress={router.back} title={t('Cancel')} />*/}
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
                label={t('Code')}
                onChangeText={(text: string) => setCode(text)}
                value={code}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton onPress={handleJoinGroup} title={t('Join')} />
            </View>
            <View className="w-full">
              <CustomButton onPress={() => router.back()} title={t('Cancel')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
