import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { Validator } from '@/util/Validator';

export default function EditProfileLastName() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.length >= 2;
      },
      errorMessage: t('Last name must contain at least 2 characters'),
    },
    {
      rule(arg: string) {
        return arg.length <= 20;
      },
      errorMessage: t('Last name may contain at most 20 characters'),
    },
    {
      rule: /^[\p{L}' -]*$/u,
      errorMessage: t('Last name can only contain only letters, apostrophes, spaces, or hyphens'),
    },
    {
      rule: /^\p{Lu}.*$/u,
      errorMessage: t('Last name must start with capital letter'),
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
          <CustomImage image={profileUpdate.profilePicture} size="colossal" />
          <View className=" w-full flex-col space-y-[12px]">
            <MultiTextInput
              label={t('Last name')}
              onChangeText={(lastName) =>
                setProfileUpdate({
                  ...profileUpdate,
                  userDetails: {
                    ...profileUpdate.userDetails,
                    lastName: lastName === '' ? undefined : lastName,
                  },
                  isValid: {
                    ...profileUpdate.isValid,
                    lastName: lastName === '' ? true : validator.validate(lastName).length === 0,
                  },
                })
              }
              value={profileUpdate.userDetails.lastName}
              autoFocus
              onBlur={() => router.back()}
              errorMessages={
                profileUpdate.userDetails.lastName
                  ? validator.validate(profileUpdate.userDetails.lastName)
                  : []
              }
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
