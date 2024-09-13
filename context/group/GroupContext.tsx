import React, { createContext, FC, ReactNode, useState } from 'react';

import { Group } from '@/hooks/group/UseGroups';

interface GroupContextProps {
  group: Group;
  setGroup: (group: Group) => void;
}

const defaultGroup: Group = {
  groupId: '',
  name: '',
  ownerId: '',
  attachmentId: '',
};

export const GroupContext = createContext<GroupContextProps>({
  group: defaultGroup,
  setGroup: () => {},
});

export const GroupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [group, setGroup] = useState<Group>(defaultGroup);

  return <GroupContext.Provider value={{ group, setGroup }}>{children}</GroupContext.Provider>;
};
