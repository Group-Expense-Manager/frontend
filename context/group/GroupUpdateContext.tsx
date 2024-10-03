import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';

export interface GroupUpdate {
  groupName: string;
  isValidGroupName: boolean;
  groupPicture?: ImageBase64;
}

interface GroupUpdateContextProps {
  groupUpdate: GroupUpdate;
  setGroupUpdate: (groupUpdate: GroupUpdate) => void;
}

const defaultGroupUpdate: GroupUpdate = {
  groupName: '',
  isValidGroupName: false,
  groupPicture: undefined,
};

export const GroupUpdateContext = createContext<GroupUpdateContextProps>({
  groupUpdate: defaultGroupUpdate,
  setGroupUpdate: () => {},
});

export const GroupUpdateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [groupUpdate, setGroupUpdate] = useState<GroupUpdate>(defaultGroupUpdate);

  return (
    <GroupUpdateContext.Provider value={{ groupUpdate, setGroupUpdate }}>
      {children}
    </GroupUpdateContext.Provider>
  );
};
