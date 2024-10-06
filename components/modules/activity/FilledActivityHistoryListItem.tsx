import React from 'react';

import ActivityHistoryListItem from './ActivityHistoryListItem';

import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

export type ActivityHistoryEntry = {
  participantId: string;
  activityAction: 'CREATED' | 'EDITED' | 'DELETED' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  comment?: string;
};

interface FilledActivityHistoryEntryProps {
  groupId: string;
  historyEntry: ActivityHistoryEntry;
  activityType: 'EXPENSE' | 'PAYMENT';
  position: 'left' | 'right';
}

const FilledActivityHistoryListItem: React.FC<FilledActivityHistoryEntryProps> = ({
  groupId,
  historyEntry,
  activityType,
  position,
}) => {
  const { data: groupMemberDetails } = useGroupMemberDetails(groupId, historyEntry.participantId);
  const { data: profilePicture } = useProfilePicture(
    historyEntry.participantId,
    groupMemberDetails?.attachmentId,
  );

  return (
    <ActivityHistoryListItem
      activityAction={historyEntry.activityAction}
      activityType={activityType}
      date={historyEntry.createdAt}
      image={profilePicture}
      position={position}
      username={groupMemberDetails ? getFirstNameOrUsername(groupMemberDetails) : ''}
      message={historyEntry.comment}
    />
  );
};

export default FilledActivityHistoryListItem;
