import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import NavBar from '@/components/ui/bar/NavBar';
import OptionsBar from '@/components/ui/bar/OptionsBar';
import Box from '@/components/ui/box/Box';
import CustomImage from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';
import { getNameFromUserDetails } from '@/util/GetName';

export default function NewPaymentRecipientDetails() {
  const { t } = useTranslation();
  const { paymentCreation } = useContext(PaymentCreationContext);
  const { data: recipientDetails } = useGroupMemberDetails(
    paymentCreation.groupId,
    paymentCreation.recipientId,
  );
  const { data: profilePicture } = useProfilePicture(
    paymentCreation.recipientId,
    recipientDetails?.attachmentId,
  );

  return (
    <Box>
      <View className="py-8">
        {recipientDetails && profilePicture ? (
          <View className="w-full h-full flex flex-col justify-between items-center">
            <View className="w-full">
              <View className="w-full flex justify-center items-center">
                <CustomImage size="colossal" image={profilePicture} />
              </View>
              <View className="py-8 space-y-2">
                <NavBar title={t('Details')} type="segment" />
                <View>
                  <OptionsBar
                    leftText={t('Recipient')}
                    rightText={getNameFromUserDetails(recipientDetails)}
                  />
                  <OptionsBar
                    leftText={t('Preferred payment method')}
                    rightText={t(recipientDetails.preferredPaymentMethod)}
                  />
                  {recipientDetails.phoneNumber && (
                    <OptionsBar
                      leftText={t('Phone number')}
                      rightText={t(recipientDetails.phoneNumber)}
                    />
                  )}
                  {recipientDetails.bankAccountNumber && (
                    <OptionsBar
                      leftText={t('Bank account number')}
                      rightText={t(recipientDetails.bankAccountNumber)}
                    />
                  )}
                </View>
              </View>
            </View>

            <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
              <View className="w-full">
                <CustomButton
                  onPress={() => router.push('/payments/new/title')}
                  title={t('Next')}
                />
              </View>
              <View className="w-full">
                <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
              </View>
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </Box>
  );
}
