import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import ProfileHeader from '@/components/modules/userdetails/ProfileHeader';
import SafeView from '@/components/ui/box/SafeView';
import { GlobalContext } from '@/context/GlobalContext';
import { ButtonType } from '@/util/ButtonType';

export default function You() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);

  function getName() {
    if (userData.userDetails.firstName! && userData.userDetails.lastName!) {
      return `${userData.userDetails.firstName} ${userData.userDetails.lastName}`;
    } else if (userData.userDetails.firstName!) {
      return userData.userDetails.firstName;
    } else if (userData.userDetails.lastName!) {
      return userData.userDetails.lastName;
    } else {
      return undefined;
    }
  }

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex flex-col justify-between items-center ">
        <View className="w-full space-y-[34px]">
          <ProfileHeader
            image={userData.profilePicture}
            username={userData.userDetails.username}
            name={getName()}
          />
          <View className="w-full">
            <CustomButton onPress={() => {}} title={t('Edit profile')} />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('change-password-old')}
              title={t('Change password')}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={() => router.push('preferences')} title={t('Preferences')} />
          </View>
        </View>
        <View className="w-full my-[34px]">
          <CustomButton
            onPress={() => router.replace('/logout')}
            title={t('Logout')}
            type={ButtonType.OUTLINED}
          />
        </View>
      </View>
    </SafeView>
  );
}
