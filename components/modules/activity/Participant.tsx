import React from 'react';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import theme from '@/constants/Colors';
import { CheckCircleIcon, HelpCircleIcon, XCircleIcon } from '@/constants/Icon';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { ExpenseParticipant } from '@/hooks/expense/UseExpense';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getFirstNameOrUsername } from '@/util/GetName';
import { IconSize } from '@/util/IconSize';
import { numberToString } from '@/util/StringUtils';

interface UserCostStatusProps {
  participant: ExpenseParticipant;
  groupId: string;
  currency: string;
}

const Participant: React.FC<UserCostStatusProps> = ({ participant, groupId, currency }) => {
  const { data: groupMemberDetails } = useGroupMemberDetails(groupId, participant.participantId);
  const { data: profilePicture } = useProfilePicture(
    participant.participantId,
    groupMemberDetails?.attachmentId,
  );

  const selectIcon = () => {
    switch (participant.participantStatus) {
      case 'ACCEPTED':
        return (
          <CheckCircleIcon
            stroke={theme.green.dark}
            width={IconSize.SMALL}
            height={IconSize.SMALL}
          />
        );
      case 'PENDING':
        return (
          <HelpCircleIcon
            stroke={theme.yellow.base}
            width={IconSize.SMALL}
            height={IconSize.SMALL}
          />
        );
      case 'REJECTED':
        return (
          <XCircleIcon stroke={theme.red.dark} width={IconSize.SMALL} height={IconSize.SMALL} />
        );
    }
  };

  return (
    <View className="bg-primary-lightest dark:bg-ink-base border-primary-base border-2 rounded-lg flex-row px-2 py-1.5 space-x-2">
      <View>
        <CustomImage size="small" image={profilePicture} />
      </View>
      <View className="flex-1 flex-row justify-between items-center space-x-2">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="flex-1 font-bold text-regular text-ink-darkest dark:text-sky-lightest">
          {groupMemberDetails ? getFirstNameOrUsername(groupMemberDetails) : ''}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-bold text-regular text-right max-w-[50%] text-ink-darkest dark:text-sky-lightest">
          {`${numberToString(participant.participantCost)} ${currency}`}
        </Text>
        <View>{selectIcon()}</View>
      </View>
    </View>
  );
};

export default Participant;
