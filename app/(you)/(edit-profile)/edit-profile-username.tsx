import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { Validator } from '@/util/Validator';

export default function EditProfileUsername() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.length >= 3;
      },
      errorMessage: t('Username must contain at least 3 characters'),
    },
    {
      rule(arg: string) {
        return arg.length <= 20;
      },
      errorMessage: t('Username may contain at most 20 characters'),
    },
    {
      rule: /^[\p{L}0-9_.+-]*$/u,
      errorMessage: t('Username can only contain letters, numbers and sings: "_.+-"'),
    },
  ]);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Profile edition')}
          onLeftIconPress={() => {
            router.back();
          }}
        />
      ),
    });
  });

  return (
    <Box>
      <View className="w-full h-full flex-col">
        <View className="w-full flex-col space-y-[28px] items-center">
          <CustomImage image={{ uri: profileUpdate.profilePicture.imageUri }} size="colossal" />
          <View className=" w-full flex-col space-y-[12px]">
            <SingleTextInput
              label={t('Nick')}
              onChangeText={(username) =>
                setProfileUpdate({
                  ...profileUpdate,
                  userDetails: { ...profileUpdate.userDetails, username },
                  isValid: {
                    ...profileUpdate.isValid,
                    username: validator.validate(username).length === 0,
                  },
                })
              }
              value={profileUpdate.userDetails.username}
              autoFocus
              onBlur={() => router.back()}
              errorMessages={validator.validate(profileUpdate.userDetails.username)}
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
