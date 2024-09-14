import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import InfoCard from '@/components/ui/card/InfoCard';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useUserDetails from '@/hooks/userdetails/UseUserDetails';
import { ButtonType } from '@/util/ButtonType';
import { getName } from '@/util/GetName';

export default function You() {
  const { t } = useTranslation();
  const { authState } = useContext(GlobalContext);
  const { data: userDetails } = useUserDetails();
  const { data: profilePicture } = useProfilePicture(authState.userId!, userDetails?.attachmentId);

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex flex-col justify-between items-center ">
        <View className="w-full space-y-[34px]">
          {userDetails ? (
            <InfoCard
              image={profilePicture}
              details={userDetails.username}
              title={getName(userDetails.firstName, userDetails.lastName)}
            />
          ) : (
            <Loader />
          )}

          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/you/edit-profile')}
              title={t('Edit profile')}
            />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/you/password-change/old-password')}
              title={t('Change password')}
            />
          </View>
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/you/preferences')}
              title={t('Preferences')}
            />
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
