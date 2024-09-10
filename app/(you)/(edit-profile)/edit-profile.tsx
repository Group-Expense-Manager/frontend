import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { GlobalContext, PaymentMethod } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useUpdateProfilePicture from '@/hooks/attachment/UseUpdateProfilePicture';
import useUpdateUserDetails from '@/hooks/userdetails/UseUpdateUserDetails';
import { handleImageChoice } from '@/util/HandleImageChoice';

export default function EditProfile() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);
  const navigation = useNavigation();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    SelectInputData<PaymentMethod>
  >({
    value: profileUpdate.userDetails.preferredPaymentMethod,
    name: t(profileUpdate.userDetails.preferredPaymentMethod),
  });

  const [bothRunning, setBothRunning] = useState(false);
  const {
    mutate: updateUserDetails,
    isPending: isUpdatedUserDetailsPending,
    isSuccess: isUpdatedUserDetailsSuccess,
    isError: isUpdatedUserDetailsError,
  } = useUpdateUserDetails(bothRunning);
  const {
    mutate: updateProfilePicture,
    isPending: isUpdatedProfilePicturePending,
    isSuccess: isUpdatedProfilePictureSuccess,
    isError: isUpdatedProfilePictureError,
  } = useUpdateProfilePicture(bothRunning);

  useEffect(() => {
    if (isUpdatedUserDetailsSuccess && isUpdatedProfilePictureSuccess) {
      router.back();
    }
  }, [isUpdatedUserDetailsSuccess, isUpdatedProfilePictureSuccess]);

  useEffect(() => {
    if (isUpdatedUserDetailsError || isUpdatedProfilePictureError) {
      router.push('/(you)/(modal)/error-modal');
    }
  }, [isUpdatedUserDetailsError, isUpdatedProfilePictureError]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      handleImageChoice(
        result.assets[0],
        () => router.push('/unsupported-file-format-modal'),
        () => router.push('/image-too-large-modal'),
        () =>
          setProfileUpdate({
            ...profileUpdate,
            profilePicture: {
              imageUri: `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`,
            },
          }),
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Profile edition')}
          onLeftIconPress={() => {
            if (isUpdatedUserDetailsPending || isUpdatedProfilePicturePending) {
              return;
            }
            if (dataChanged()) {
              router.push('/(edit-profile)/(modal)/exit-without-saving-modal');
            } else {
              router.back();
            }
          }}
        />
      ),
    });
  }, [
    navigation,
    profileUpdate,
    userData,
    isUpdatedUserDetailsPending,
    isUpdatedProfilePicturePending,
  ]);

  function handleBackClick() {
    if (isUpdatedUserDetailsPending || isUpdatedProfilePicturePending) {
      return true;
    }
    if (dataChanged()) {
      router.push('/exit-without-saving-modal');
      return true;
    }
    return false;
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackClick);
    return () => backHandler.remove();
  }, [profileUpdate, userData, isUpdatedUserDetailsPending, isUpdatedProfilePicturePending]);

  function dataChanged(): boolean {
    return userDetailsChanged() || profilePictureChanged();
  }

  function userDetailsChanged(): boolean {
    return (
      userData.userDetails.username !== profileUpdate.userDetails.username ||
      userData.userDetails.firstName !== profileUpdate.userDetails.firstName ||
      userData.userDetails.lastName !== profileUpdate.userDetails.lastName ||
      userData.userDetails.phoneNumber !== profileUpdate.userDetails.phoneNumber ||
      userData.userDetails.bankAccountNumber !== profileUpdate.userDetails.bankAccountNumber ||
      userData.userDetails.preferredPaymentMethod !==
        profileUpdate.userDetails.preferredPaymentMethod
    );
  }

  function profilePictureChanged(): boolean {
    return userData.profilePicture.uri !== profileUpdate.profilePicture.imageUri;
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

  function handleSave() {
    if (userDetailsChanged() && profilePictureChanged()) {
      setBothRunning(true);
      updateUserDetails();
      updateProfilePicture();
    } else if (userDetailsChanged()) {
      setBothRunning(false);
      updateUserDetails();
    } else if (profilePictureChanged()) {
      setBothRunning(false);
      updateProfilePicture();
    }
  }

  function setPaymentMethod(paymentMethod: PaymentMethod) {
    setSelectedPaymentMethod({ value: paymentMethod, name: t(paymentMethod) });
    setProfileUpdate({
      ...profileUpdate,
      userDetails: {
        ...profileUpdate.userDetails,
        preferredPaymentMethod: paymentMethod,
      },
    });
  }

  return (
    <Box>
      <View className="w-full h-full flex-col">
        <Loader
          isLoading={isUpdatedUserDetailsPending || isUpdatedProfilePicturePending}
          hasViewHeader
        />
        <View className="w-full flex-col space-y-[28px]">
          <ProfilePictureEdition
            image={{ uri: profileUpdate.profilePicture.imageUri }}
            onPress={pickImage}
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
            <View>
              <SelectInput
                onSelect={setPaymentMethod}
                onPress={() =>
                  router.navigate('/(edit-profile)/edit-profile-preferred-payment-method-select')
                }
                label={t('Preferred payment method')}
                value={selectedPaymentMethod}
              />
            </View>
          </View>
        </View>
        {dataChanged() && (
          <View className="flex-1 justify-center">
            <CustomButton
              title={t('Save changes')}
              onPress={() => handleSave()}
              disabled={!dataIsValid()}
            />
          </View>
        )}
      </View>
    </Box>
  );
}
