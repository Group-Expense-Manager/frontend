import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import InfoCard from '@/components/ui/card/InfoCard';
import { GlobalContext } from '@/context/GlobalContext';
import { ButtonType } from '@/util/ButtonType';
import { getName } from '@/util/GetName';

export default function You() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex flex-col justify-between items-center ">
        <View className="w-full space-y-[34px]">
          <InfoCard
            image={userData.profilePicture}
            details={userData.userDetails.username}
            title={getName(userData.userDetails.firstName, userData.userDetails.lastName)}
          />
          <View className="w-full">
            <CustomButton onPress={() => router.push('/edit-profile')} title={t('Edit profile')} />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/change-password-old')}
              title={t('Change password')}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={() => router.push('/preferences')} title={t('Preferences')} />
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
