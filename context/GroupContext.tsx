import React, { createContext, FC, ReactNode, useState } from 'react';

import { Group } from '@/hooks/group/UseGroups';

export interface GroupProps {
  currentGroupId: string;
  groups: Group[];
}

interface GroupContextProps {
  groupProps: GroupProps;
  setGroupProps: (groupProps: GroupProps) => void;
}

const defaultGroupProps: GroupProps = {
  currentGroupId: '',
  groups: [],
};

export const GroupContext = createContext<GroupContextProps>({
  groupProps: defaultGroupProps,
  setGroupProps: () => {},
});

export const GroupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [groupProps, setGroupProps] = useState<GroupProps>(defaultGroupProps);

  return (
    <GroupContext.Provider value={{ groupProps, setGroupProps }}>{children}</GroupContext.Provider>
  );
};
