import React from 'react';

import { TouchableActivity } from '@/components';
import GroupMemberImage from '@/components/modules/activity/GroupMemberImage';
import { ActivityListElement } from '@/hooks/activity/UseActivities';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import useGroupMembersDetails from '@/hooks/userdetails/UseGroupMembersDetails';
import { getNameFromUserDetails } from '@/util/GetName';

interface ActivityListItemProps {
  groupId: string;
  activity: ActivityListElement;
  onPress: () => void;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ groupId, activity, onPress }) => {
  const { data: groupMembersDetails } = useGroupMembersDetails(groupId);

  const { data: creatorDetails } = useGroupMemberDetails(groupId, activity.creatorId);

  return (
    creatorDetails &&
    groupMembersDetails && (
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
