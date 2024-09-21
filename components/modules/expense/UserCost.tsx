import React from 'react';

import UserValue from '@/components/ui/user-value/UserValue';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

interface UserCostProps {
  userDetails: GroupMemberDetails;
  type: 'balance' | 'weight' | 'cost';
  value: number;
  currency?: string;
  onPress?: () => void;
}

const UserCost: React.FC<UserCostProps> = ({ userDetails, type, value, currency, onPress }) => {
  const { data: profilePicture } = useProfilePicture(userDetails.id, userDetails.attachmentId);

  const user = getFirstNameOrUsername(userDetails);

  return (
    <UserValue
      type={type}
      user={user}
      value={value}
      currency={currency}
      onPress={onPress}
      image={profilePicture}
    />
  );
};

export default UserCost;
