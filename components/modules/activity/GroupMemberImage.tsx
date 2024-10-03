import React from 'react';

import CustomImage from '@/components/ui/image/CustomImage';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
interface GroupMemberImageProps {
  groupMemberDetails: GroupMemberDetails;
}

const GroupMemberImage: React.FC<GroupMemberImageProps> = ({ groupMemberDetails }) => {
  const { data: profilePicture } = useProfilePicture(
    groupMemberDetails.id,
    groupMemberDetails.attachmentId,
  );

  return <CustomImage image={profilePicture} size="tiny" />;
};

export default GroupMemberImage;
