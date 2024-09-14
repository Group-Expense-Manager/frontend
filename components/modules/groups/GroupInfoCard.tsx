import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ListItemInfoCard from '@/components/ui/card/ListItemInfoCard';
import theme from '@/constants/Colors';
import { SettingsIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useGroup from '@/hooks/group/UseGroup';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getNameFromUserDetails } from '@/util/GetName';

interface GroupInfoCardProps {
  groupId: string;
}

const GroupInfoCard: React.FC<GroupInfoCardProps> = ({ groupId }) => {
  const { t } = useTranslation();
  const { userData, setUserData } = useContext(GlobalContext);

  const { data: groupDetails } = useGroup(groupId);
  const { data: ownerDetails } = useGroupMemberDetails(groupId, groupDetails?.ownerId);
  const { data: groupPicture } = useGroupPicture(groupId, groupDetails?.attachmentId);

  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (ownerDetails) {
      setAuthor(getNameFromUserDetails(ownerDetails));
    }
  }, [ownerDetails]);

  return groupDetails ? (
    <ListItemInfoCard
      image={!groupPicture ? { uri: '' } : groupPicture}
      title={groupDetails.name}
      details={`${t('author')}: ${author}`}
      iconProps={{
        icon: <SettingsIcon />,
        color: theme.ink.darkest,
        darkModeColor: theme.sky.lightest,
        onPress: () => {
          router.push(`/groups/${groupId}`);
        },
      }}
      onPress={() => {
        setUserData({ ...userData, currentGroupId: groupId });
        router.back();
      }}
    />
  ) : null;
};

export default GroupInfoCard;
