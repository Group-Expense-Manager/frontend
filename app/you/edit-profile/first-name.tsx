import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { Validator } from '@/util/Validator';

export default function FirstName() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.length >= 2;
      },
      errorMessage: t('First name must contain at least 2 characters'),
    },
    {
      rule(arg: string) {
        return arg.length <= 20;
      },
      errorMessage: t('First name may contain at most 20 characters'),
    },
    {
      rule: /^[\p{L}' -]*$/u,
      errorMessage: t('First name can only contain only letters, apostrophes, spaces, or hyphens'),
    },
    {
      rule: /^\p{Lu}.*$/u,
      errorMessage: t('First name must start with capital letter'),
    },
  ]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
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
              label={t('First name')}
              onChangeText={(firstName) =>
                setProfileUpdate({
                  ...profileUpdate,
                  userDetails: {
                    ...profileUpdate.userDetails,
                    firstName: firstName === '' ? undefined : firstName,
                  },
                  isValid: {
                    ...profileUpdate.isValid,
                    firstName: firstName === '' ? true : validator.validate(firstName).length === 0,
                  },
                })
              }
              value={profileUpdate.userDetails.firstName}
              autoFocus
              onBlur={() => router.back()}
              errorMessages={
                profileUpdate.userDetails.firstName
                  ? validator.validate(profileUpdate.userDetails.firstName)
                  : []
              }
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
