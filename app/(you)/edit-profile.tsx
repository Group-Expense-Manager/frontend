import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, TouchableOpacity, View } from 'react-native';

import { Loader } from '@/components';
import ProfilePictureEdition from '@/components/modules/userdetails/ProfilePictureEdition';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import NumericTextInput from '@/components/ui/text-input/NumericTextInput';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import { GlobalContext } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import useUpdateUserDetails from '@/hooks/userdetails/UseUpdateUserDetails';

export default function EditProfile() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const { profileUpdate } = useContext(ProfileUpdateContext);
  const navigation = useNavigation();
  const { mutate: update, isPending: isUpdatePending } = useUpdateUserDetails();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Profile edition')}
          onLeftIconPress={() => {
            if (isUpdatePending) {
              return;
            }
            if (dataChanged()) {
              router.push('/exit-without-saving-popover');
            } else {
              router.back();
            }
          }}
        />
      ),
    });
  }, [navigation, profileUpdate, userData, isUpdatePending]);

  function handleBackClick() {
    if (isUpdatePending) {
      return true;
    }
    if (dataChanged()) {
      router.push('/exit-without-saving-popover');
      return true;
    }
    return false;
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackClick);
    return () => backHandler.remove();
  }, [profileUpdate, userData, isUpdatePending]);

  function dataChanged(): boolean {
    return (
      userData.userDetails.username !== profileUpdate.userDetails.username ||
      userData.userDetails.firstName !== profileUpdate.userDetails.firstName ||
      userData.userDetails.lastName !== profileUpdate.userDetails.lastName ||
      userData.userDetails.phoneNumber !== profileUpdate.userDetails.phoneNumber ||
      userData.userDetails.bankAccountNumber !== profileUpdate.userDetails.bankAccountNumber ||
      userData.userDetails.preferredPaymentMethod !==
        profileUpdate.userDetails.preferredPaymentMethod ||
      userData.profilePicture.uri !== profileUpdate.profilePicture.imageUri
    );
  }

  function dataIsValid(): boolean {
    return (
      profileUpdate.isValid.username &&
      profileUpdate.isValid.firstName &&
      profileUpdate.isValid.lastName &&
      profileUpdate.isValid.phoneNumber &&
      profileUpdate.isValid.bankAccountNumber
    );
  }

  return (
    <Box>
      <View className="w-full h-full flex-col">
        <Loader isLoading={isUpdatePending} hasViewHeader />
        <View className="w-full flex-col space-y-[28px]">
          <ProfilePictureEdition
            image={{ uri: profileUpdate.profilePicture.imageUri }}
            onPress={() => {}}
          />
          <View className=" w-full flex-col space-y-[12px]">
            <TouchableOpacity onPress={() => router.push('/edit-profile-username')}>
              <View pointerEvents="none">
                <SingleTextInput
                  label={t('Nick')}
                  value={profileUpdate.userDetails.username}
                  showErrors={!profileUpdate.isValid.username}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile-first-name')}>
              <View pointerEvents="none">
                <MultiTextInput
                  label={t('First name')}
                  value={profileUpdate.userDetails.firstName}
                  showErrors={!profileUpdate.isValid.firstName}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile-last-name')}>
              <View pointerEvents="none">
                <MultiTextInput
                  label={t('Last name')}
                  value={profileUpdate.userDetails.lastName}
                  showErrors={!profileUpdate.isValid.lastName}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile-phone-number')}>
              <View pointerEvents="none">
                <NumericTextInput
                  label={t('Phone number')}
                  value={profileUpdate.userDetails.phoneNumber}
                  showErrors={!profileUpdate.isValid.phoneNumber}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile-bank-account-number')}>
              <View pointerEvents="none">
                <NumericTextInput
                  label={t('Bank account number')}
                  value={profileUpdate.userDetails.bankAccountNumber}
                  showErrors={!profileUpdate.isValid.bankAccountNumber}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile-preferred-payment-method')}>
              <View pointerEvents="none">
                <SingleTextInput
                  label={t('Preferred payment method')}
                  value={t(profileUpdate.userDetails.preferredPaymentMethod)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {dataChanged() && (
          <View className="flex-1 justify-center">
            <CustomButton
              title={t('Save changes')}
              onPress={() => update()}
              disabled={!dataIsValid()}
            />
          </View>
        )}
      </View>
    </Box>
  );
}
