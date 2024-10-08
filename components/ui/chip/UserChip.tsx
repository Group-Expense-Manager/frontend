import React from 'react';
import { View } from 'react-native';

import Chip from '@/components/ui/chip/Chip';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

interface UserChipProps {
  type: 'normal' | 'remove' | 'select' | 'filter';
  onPress?: () => void;
  userDetails: GroupMemberDetails;
}

const UserChip: React.FC<UserChipProps> = ({ type, onPress = () => {}, userDetails }) => {
  const { data: profilePicture } = useProfilePicture(userDetails.id, userDetails.attachmentId);

  return (
    <View key={userDetails.id}>
      <Chip
        text={getFirstNameOrUsername(userDetails)}
        type={type}
        onPress={onPress}
        image={profilePicture}
      />
    </View>
  );
};

export default UserChip;
