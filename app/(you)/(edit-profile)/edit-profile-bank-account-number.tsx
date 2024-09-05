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

export default function EditProfileBankAccountNumber() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

  const validator = new Validator([
    {
      rule: /^[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{11,30}$/,
      errorMessage: t('Invalid Bank account number format'),
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
              label={t('Bank account number')}
              onChangeText={(bankAccountNumber) =>
                setProfileUpdate({
                  ...profileUpdate,
                  userDetails: {
                    ...profileUpdate.userDetails,
                    bankAccountNumber: bankAccountNumber === '' ? undefined : bankAccountNumber,
                  },
                  isValid: {
                    ...profileUpdate.isValid,
                    bankAccountNumber:
                      bankAccountNumber === ''
                        ? true
                        : validator.validate(bankAccountNumber).length === 0,
                  },
                })
              }
              value={profileUpdate.userDetails.bankAccountNumber}
              autoFocus
              onBlur={() => router.back()}
              errorMessages={
                profileUpdate.userDetails.bankAccountNumber
                  ? validator.validate(profileUpdate.userDetails.bankAccountNumber)
                  : []
              }
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
