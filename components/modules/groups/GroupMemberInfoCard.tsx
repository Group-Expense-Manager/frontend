import React from 'react';

import ListItemInfoCard from '@/components/ui/card/ListItemInfoCard';
import theme from '@/constants/Colors';
import { DiamondIcon } from '@/constants/Icon';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getName } from '@/util/GetName';

interface GroupMemberCardProps {
  member: GroupMemberDetails;
  isOwner: boolean;
}

const GroupMemberInfoCard: React.FC<GroupMemberCardProps> = ({ member, isOwner }) => {
  const { data: profilePicture } = useProfilePicture(member.id, member.attachmentId);

  return (
    <ListItemInfoCard
      image={profilePicture}
      title={getName(member.firstName, member.lastName)}
      details={member.username}
      iconProps={
        isOwner
          ? {
              icon: <DiamondIcon />,
              color: theme.primary.base,
            }
          : undefined
      }
    />
  );
};

export default GroupMemberInfoCard;
