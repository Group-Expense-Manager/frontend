import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import GroupMemberInfo from '@/components/modules/userdetails/GroupMemberInfo';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';

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
            <GroupMemberInfo
              groupMemberDetails={recipientDetails}
              profilePicture={profilePicture}
            />

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
