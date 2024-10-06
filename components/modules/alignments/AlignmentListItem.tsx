import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import theme from '@/constants/Colors';
import { CurvedArrowIcon } from '@/constants/Icon';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getFirstNameOrUsername } from '@/util/GetName';
import { numberToString } from '@/util/StringUtils';

interface AlignmentListItemProps {
  payerDetails: GroupMemberDetails;
  payeeDetails: GroupMemberDetails;
  value: number;
  currency: string;
  onPress?: () => void;
}

const AlignmentListItem: React.FC<AlignmentListItemProps> = ({
  payerDetails,
  payeeDetails,
  value,
  currency,
  onPress,
}) => {
  const { colorScheme } = useColorScheme();
  const { data: payerProfilePicture } = useProfilePicture(
    payerDetails.id,
    payerDetails.attachmentId,
  );
  const { data: payeeProfilePicture } = useProfilePicture(
    payeeDetails.id,
    payeeDetails.attachmentId,
  );

  return (
    <SingleClickTouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-primary-lightest dark:bg-ink-base border-primary-base border-2 rounded-lg flex-row px-2 py-1.5 space-x-2 items-center">
      <CurvedArrowIcon fill={colorScheme === 'light' ? theme.ink.darkest : theme.sky.lightest} />
      <View className="flex-1 space-y-1">
        <View className="flex-row space-x-2 items-center">
          <CustomImage size="tiny" image={payerProfilePicture} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-ink-darkest dark:text-sky-lightest text-small flex-1">
            {getFirstNameOrUsername(payerDetails)}
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
          <CustomImage size="tiny" image={payeeProfilePicture} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-ink-darkest dark:text-sky-lightest text-small flex-1">
            {getFirstNameOrUsername(payeeDetails)}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="font-bold text-regular text-right max-w-[50%] justify-center text-ink-darkest dark:text-sky-lightest">
        {`${numberToString(value)} ${currency}`}
      </Text>
    </SingleClickTouchableOpacity>
  );
};

export default AlignmentListItem;
