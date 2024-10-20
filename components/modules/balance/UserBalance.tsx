import React from 'react';

import UserValue from '@/components/ui/user-value/UserValue';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { Balance } from '@/hooks/finance/UseBalances';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

interface UserBalanceProps {
  userDetails: GroupMemberDetails;
  balance: Balance;
  currency: string;
}

const UserBalance: React.FC<UserBalanceProps> = ({ userDetails, balance, currency }) => {
  const { data: profilePicture } = useProfilePicture(userDetails.id, userDetails.attachmentId);

  const user = getFirstNameOrUsername(userDetails);

  return (
    <UserValue
      type="balance"
      user={user}
      value={balance.value}
      currency={currency}
      image={profilePicture}
    />
  );
};

export default UserBalance;
