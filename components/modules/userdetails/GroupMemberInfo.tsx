import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import NavBar from '@/components/ui/bar/NavBar';
import OptionsBar from '@/components/ui/bar/OptionsBar';
import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import { UserDetails } from '@/hooks/userdetails/UseUserDetails';
import { getNameFromUserDetails } from '@/util/GetName';

interface GroupMemberInfoProps {
  groupMemberDetails: UserDetails;
  profilePicture: ImageBase64;
}

const GroupMemberInfo: React.FC<GroupMemberInfoProps> = ({
  groupMemberDetails,
  profilePicture,
}) => {
  const { t } = useTranslation();

  return (
    <View className="w-full">
      <View className="w-full flex justify-center items-center">
        <CustomImage size="colossal" image={profilePicture} />
      </View>
      <View className="py-8 space-y-2">
        <NavBar title={t('Details')} type="segment" />
        <View>
          <OptionsBar
            leftText={t('Recipient')}
            rightText={getNameFromUserDetails(groupMemberDetails)}
          />
          <OptionsBar
            leftText={t('Preferred payment method')}
            rightText={t(groupMemberDetails.preferredPaymentMethod)}
          />
          {groupMemberDetails.phoneNumber && (
            <OptionsBar
              leftText={t('Phone number')}
              rightText={t(groupMemberDetails.phoneNumber)}
              copiable
            />
          )}
          {groupMemberDetails.bankAccountNumber && (
            <OptionsBar
              leftText={t('Bank account number')}
              rightText={t(groupMemberDetails.bankAccountNumber)}
              copiable
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default GroupMemberInfo;
