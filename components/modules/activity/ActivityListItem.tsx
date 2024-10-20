import React from 'react';

import GroupMemberImage from '@/components/modules/activity/GroupMemberImage';
import TouchableActivity from '@/components/modules/activity/TouchableActivity';
import { ActivityListElement } from '@/hooks/finance/UseActivities';
import { GroupMembersDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { getNameFromUserDetails } from '@/util/GetName';

interface ActivityListItemProps {
  activity: ActivityListElement;
  groupMembersDetails: GroupMembersDetails;
  onPress: () => void;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({
  activity,
  onPress,
  groupMembersDetails,
}) => {
  const creatorDetails = groupMembersDetails.details.find((it) => it.id === activity.creatorId);
  return (
    creatorDetails && (
      <TouchableActivity
        type={activity.type}
        creatorName={getNameFromUserDetails(creatorDetails)}
        title={activity.title}
        value={activity.value}
        currency={activity.currency}
        status={activity.status}
        creatorPicture={<GroupMemberImage groupMemberDetails={creatorDetails} />}
        participantPictures={groupMembersDetails.details
          .filter((details) => activity.participantIds.includes(details.id))
          .map((details) => (
            <GroupMemberImage groupMemberDetails={details} />
          ))}
        date={activity.date}
        onPress={onPress}
      />
    )
  );
};

export default ActivityListItem;
