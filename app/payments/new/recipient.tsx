import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import UserSelectInput from '@/components/ui/text-input/select/UserSelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import useGroupMembersDetails, {
  GroupMemberDetails,
} from '@/hooks/userdetails/UseGroupMembersDetails';
import { ButtonType } from '@/util/ButtonType';
import { getFirstNameOrUsername } from '@/util/GetName';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentRecipient() {
  const { t } = useTranslation();

  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);

  const [selectedMember, setSelectedMember] = useState<GroupMemberDetails>();

  const { data: membersDetails } = useGroupMembersDetails(paymentCreation.groupId);

  const { authState } = useContext(GlobalContext);

  const recipients = () => {
    return membersDetails?.details
      .filter((memberDetails) => memberDetails.id !== authState.userId)
      .map((memberDetails) => {
        return { value: memberDetails, name: getFirstNameOrUsername(memberDetails) };
      });
  };

  useEffect(() => {
    const recipientDetails = membersDetails?.details.find(
      (details) => details.id === paymentCreation.recipientId,
    );
    if (recipientDetails) {
      setSelectedMember(recipientDetails);
    }
  }, [membersDetails]);

  function setRecipient(memberDetails: GroupMemberDetails) {
    setSelectedMember(memberDetails);
    setPaymentCreation({
      ...paymentCreation,
      recipientId: memberDetails.id,
    });
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <UserSelectInput
              onSelect={setRecipient}
              onPress={() => router.navigate('/payments/new/recipient-select')}
              label={t('Recipient')}
              value={selectedMember}
              data={recipients()}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/payments/new/recipient-details')}
              title={t('Next')}
              disabled={!paymentCreation.recipientId}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Cancel')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
