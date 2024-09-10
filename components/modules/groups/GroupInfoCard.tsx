import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ListItemInfoCard from '@/components/ui/card/ListItemInfoCard';
import theme from '@/constants/Colors';
import { SettingsIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import { Group } from '@/hooks/group/UseGroups';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { getNameFromUserDetails } from '@/util/GetName';

interface GroupInfoCardProps {
  group: Group;
}

const GroupInfoCard: React.FC<GroupInfoCardProps> = ({ group }) => {
  const { t } = useTranslation();
  const { userData, setUserData } = useContext(GlobalContext);

  const { data: ownerDetails } = useGroupMemberDetails(group.groupId, group.ownerId);
  const { data: groupPicture } = useGroupPicture(group.groupId, group.attachmentId);

  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (ownerDetails) {
      setAuthor(getNameFromUserDetails(ownerDetails));
    }
  }, [ownerDetails]);

  return (
    <ListItemInfoCard
      image={!groupPicture ? { uri: '' } : groupPicture}
      title={group.name}
      details={`${t('author')}: ${author}`}
      iconProps={{
        icon: <SettingsIcon />,
        color: theme.ink.darkest,
        darkModeColor: theme.sky.lightest,
        onPress: () => {},
      }}
      onPress={() => {
        setUserData({ ...userData, currentGroup: group });
        router.back();
      }}
    />
  );
};

export default GroupInfoCard;
