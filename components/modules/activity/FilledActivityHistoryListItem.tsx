import React from 'react';

import ActivityHistoryListItem from './ActivityHistoryListItem';

import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { ExpenseHistoryEntry } from '@/hooks/expense/UseExpense';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

interface FilledActivityHistoryEntryProps {
  groupId: string;
  historyEntry: ExpenseHistoryEntry;
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
      activityAction={historyEntry.expenseAction}
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
