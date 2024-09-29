import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { ButtonType } from '@/util/ButtonType';
import { getFirstNameOrUsername } from '@/util/GetName';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentRecipient() {
  const { t } = useTranslation();

  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);

  const [selectedMember, setSelectedMember] = useState<SelectInputData<GroupMemberDetails>>({
    value: { id: '', username: '', firstName: '', lastName: '', attachmentId: '' },
    name: '',
  });

  function setRecipient(memberDetails: GroupMemberDetails) {
    setSelectedMember({ value: memberDetails, name: getFirstNameOrUsername(memberDetails) });
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
            <SelectInput
              onSelect={setRecipient}
              onPress={() => router.navigate('/payments/new/recipient-select')}
              label={t('Recipient')}
              value={selectedMember}
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