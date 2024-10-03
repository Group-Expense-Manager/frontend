import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, TouchableOpacity, View } from 'react-native';

import PictureUpdate from '@/components/modules/userdetails/PictureUpdate';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import NumericTextInput from '@/components/ui/text-input/NumericTextInput';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { GlobalContext } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useUpdateProfilePicture from '@/hooks/attachment/UseUpdateProfilePicture';
import useUpdateUserDetails from '@/hooks/userdetails/UseUpdateUserDetails';
import useUserDetails, { PaymentMethod } from '@/hooks/userdetails/UseUserDetails';
import { handleImageChoice } from '@/util/HandleImageChoice';

export default function Index() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const navigation = useNavigation();

  const { authState } = useContext(GlobalContext);
  const { data: userDetails, isFetching: isFetchingUserDetails } = useUserDetails();
  const { data: profilePicture, isFetching: isFetchProfilePicture } = useProfilePicture(
    authState.userId,
    userDetails?.attachmentId,
  );

  const dataPresentAndNoFetching =
    userDetails && profilePicture && !isFetchingUserDetails && !isFetchProfilePicture;

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

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
  } = useUpdateProfilePicture(bothRunning, userDetails?.attachmentId);

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
        () => router.push('/you/edit-profile/(modal)/unsupported-file-format-modal'),
        () => router.push('/you/edit-profile/(modal)/image-too-large-modal'),
        () =>
          setProfileUpdate({
            ...profileUpdate,
            profilePicture: {
              uri: `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`,
            },
          }),
      );
    }
  };

  useLayoutEffect(() => {
    if (dataPresentAndNoFetching) {
      setProfileUpdate({ ...profileUpdate, userDetails, profilePicture });
      setSelectedPaymentMethod({
        value: userDetails.preferredPaymentMethod,
        name: t(userDetails.preferredPaymentMethod),
      });
    }
  }, [dataPresentAndNoFetching]);

  useEffect(() => {
    if (isUpdatedUserDetailsSuccess && isUpdatedProfilePictureSuccess) {
      router.back();
    }
  }, [isUpdatedUserDetailsSuccess, isUpdatedProfilePictureSuccess]);

  useEffect(() => {
    if (isUpdatedUserDetailsError || isUpdatedProfilePictureError) {
      router.push('/you/edit-profile/(modal)/error-modal');
    }
  }, [isUpdatedUserDetailsError, isUpdatedProfilePictureError]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Profile edition')}
          onLeftIconPress={() => {
            if (hasUserDataChanged()) {
              router.push('/you/edit-profile/(modal)/exit-without-saving-modal');
            } else {
              router.back();
            }
          }}
          isLoading={isUpdatedUserDetailsPending || isUpdatedProfilePicturePending}
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

  function shouldBlockHardwareBackPress(): boolean {
    if (isUpdatedUserDetailsPending || isUpdatedProfilePicturePending) {
      return true;
    }
    if (hasUserDataChanged()) {
      router.push('/you/edit-profile/(modal)/exit-without-saving-modal');
      return true;
    }
    return false;
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      shouldBlockHardwareBackPress,
    );
    return () => backHandler.remove();
  }, [profileUpdate, userData, isUpdatedUserDetailsPending, isUpdatedProfilePicturePending]);

  function hasUserDataChanged(): boolean {
    return hasUserDetailsChanged() || hasProfilePictureChanged();
  }

  function hasUserDetailsChanged(): boolean {
    return (
      userDetails?.username !== profileUpdate.userDetails.username ||
      userDetails?.firstName !== profileUpdate.userDetails.firstName ||
      userDetails?.lastName !== profileUpdate.userDetails.lastName ||
      userDetails?.phoneNumber !== profileUpdate.userDetails.phoneNumber ||
      userDetails?.bankAccountNumber !== profileUpdate.userDetails.bankAccountNumber ||
      userDetails?.preferredPaymentMethod !== profileUpdate.userDetails.preferredPaymentMethod
    );
  }

  function hasProfilePictureChanged(): boolean {
    return profilePicture?.uri !== profileUpdate.profilePicture?.uri;
  }

  function isUserDataValid(): boolean {
    return (
      profileUpdate.isValid.username &&
      profileUpdate.isValid.firstName &&
      profileUpdate.isValid.lastName &&
      profileUpdate.isValid.phoneNumber &&
      profileUpdate.isValid.bankAccountNumber
    );
  }

  function handleSave() {
    if (hasUserDetailsChanged() && hasProfilePictureChanged()) {
      setBothRunning(true);
      updateUserDetails();
      updateProfilePicture();
    } else if (hasUserDetailsChanged()) {
      setBothRunning(false);
      updateUserDetails();
    } else if (hasProfilePictureChanged()) {
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
      {dataPresentAndNoFetching ? (
        <View className="w-full h-full flex-col">
          <View className="w-full flex-col space-y-[28px]">
            <PictureUpdate image={profileUpdate.profilePicture} onPress={pickImage} />
            <View className=" w-full flex-col space-y-[12px]">
              <TouchableOpacity onPress={() => router.push('/you/edit-profile/username')}>
                <View pointerEvents="none">
                  <SingleTextInput
                    label={t('Nick')}
                    value={profileUpdate.userDetails.username}
                    showErrors={!profileUpdate.isValid.username}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/you/edit-profile/first-name')}>
                <View pointerEvents="none">
                  <MultiTextInput
                    label={t('First name')}
                    value={profileUpdate.userDetails.firstName}
                    showErrors={!profileUpdate.isValid.firstName}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/you/edit-profile/last-name')}>
                <View pointerEvents="none">
                  <MultiTextInput
                    label={t('Last name')}
                    value={profileUpdate.userDetails.lastName}
                    showErrors={!profileUpdate.isValid.lastName}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/you/edit-profile/phone-number')}>
                <View pointerEvents="none">
                  <NumericTextInput
                    label={t('Phone number')}
                    value={profileUpdate.userDetails.phoneNumber}
                    showErrors={!profileUpdate.isValid.phoneNumber}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/you/edit-profile/bank-account-number')}>
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
                    router.navigate('/you/edit-profile/preferred-payment-method-select')
                  }
                  label={t('Preferred payment method')}
                  value={selectedPaymentMethod}
                />
              </View>
            </View>
          </View>
          {hasUserDataChanged() && (
            <View className="flex-1 justify-center">
              <CustomButton
                title={t('Save changes')}
                onPress={() => handleSave()}
                disabled={!isUserDataValid()}
              />
            </View>
          )}
        </View>
      ) : (
        <Loader />
      )}
    </Box>
  );
}
