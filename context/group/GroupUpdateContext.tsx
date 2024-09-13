import React, { createContext, FC, ReactNode, useState } from 'react';

export interface GroupUpdate {
  groupName: string;
  isValidGroupName: boolean;
  groupPicture: {
    uri: string;
  };
}

interface GroupUpdateContextProps {
  groupUpdate: GroupUpdate;
  setGroupUpdate: (groupUpdate: GroupUpdate) => void;
}

const defaultGroupUpdate: GroupUpdate = {
  groupName: '',
  isValidGroupName: false,
  groupPicture: {
    uri: '',
  },
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
