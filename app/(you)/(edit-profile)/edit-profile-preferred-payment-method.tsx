import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { SelectList } from '@/components';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { PaymentMethod } from '@/hooks/userdetails/UseUserDetails';

export default function EditProfileBankAccountNumber() {
  const { t } = useTranslation();

  const { profileUpdate, setProfileUpdate } = useContext(ProfileUpdateContext);

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

  function setPreferredPaymentMethod(preferredPaymentMethod: PaymentMethod) {
    setProfileUpdate({
      ...profileUpdate,
      userDetails: {
        ...profileUpdate.userDetails,
        preferredPaymentMethod,
      },
    });
  }

  return (
    <Box>
      <View className="w-full h-full flex-col">
        <View className="w-full flex-col space-y-[28px] items-center">
          <CustomImage image={profileUpdate.profilePicture} size="colossal" />
          <View className=" w-full flex-col space-y-[12px]">
            <SelectList
              name={t('Preferred payment method')}
              setSelected={(preferredMethod: PaymentMethod) => {
                setPreferredPaymentMethod(preferredMethod);
                router.back();
              }}
              data={[
                { key: PaymentMethod.NONE, value: `${t(PaymentMethod.NONE)}` },
                { key: PaymentMethod.BANK_TRANSFER, value: `${t(PaymentMethod.BANK_TRANSFER)}` },
                { key: PaymentMethod.MOBILE_PAYMENT, value: `${t(PaymentMethod.MOBILE_PAYMENT)}` },
                { key: PaymentMethod.CASH, value: `${t(PaymentMethod.CASH)}` },
              ]}
            />
          </View>
        </View>
      </View>
    </Box>
  );
}
