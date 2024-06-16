import React, { createContext, useState, ReactNode, FC } from 'react';

export interface GroupCreationProps {
  name: string;
  acceptRequired: boolean;
  groupCurrencies: string;
  attachmentId: string;
}

interface GroupCreationContextProps {
  groupCreationProps: GroupCreationProps;
  setGroupCreationProps: (groupCreationProps: GroupCreationProps) => void;
}

const defaultGroupCreationProps: GroupCreationProps = {
  name: '',
  acceptRequired: true,
  groupCurrencies: 'PLN',
  attachmentId: '123',
};

export const GroupCreationContext = createContext<GroupCreationContextProps>({
  groupCreationProps: defaultGroupCreationProps,
  setGroupCreationProps: () => {},
});

export const GroupCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [groupCreationProps, setGroupCreationProps] =
    useState<GroupCreationProps>(defaultGroupCreationProps);

  return (
    <GroupCreationContext.Provider value={{ groupCreationProps, setGroupCreationProps }}>
      {children}
    </GroupCreationContext.Provider>
  );
};
