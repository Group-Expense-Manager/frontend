import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import NumericTextInput from '@/components/ui/text-input/NumericTextInput';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { Validator } from '@/util/Validator';

export default function PhoneNumber() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

  const validator = new Validator([
    {
      rule: /^\d{8,10}$|^\+\d{11}$/,
      errorMessage: t('Invalid phone number format'),
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
            <NumericTextInput
              label={t('Phone number')}
              onChangeText={(phoneNumber) =>
                setProfileUpdate({
                  ...profileUpdate,
                  userDetails: {
                    ...profileUpdate.userDetails,
                    phoneNumber: phoneNumber === '' ? undefined : phoneNumber,
                  },
                  isValid: {
                    ...profileUpdate.isValid,
                    phoneNumber:
                      phoneNumber === '' ? true : validator.validate(phoneNumber).length === 0,
                  },
                })
              }
              value={profileUpdate.userDetails.phoneNumber}
              autoFocus
              onBlur={() => router.back()}
              errorMessages={
                profileUpdate.userDetails.phoneNumber
                  ? validator.validate(profileUpdate.userDetails.phoneNumber)
                  : []
              }
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
