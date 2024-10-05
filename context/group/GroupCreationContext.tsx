import React, { createContext, FC, ReactNode, useState } from 'react';

import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export interface GroupCreation {
  name: string;
  groupCurrencies: Currency[];
}

interface GroupCreationContextProps {
  groupCreation: GroupCreation;
  setGroupCreation: (groupCreation: GroupCreation) => void;
}

const defaultGroupCreation: GroupCreation = {
  name: '',
  groupCurrencies: [],
};

export const GroupCreationContext = createContext<GroupCreationContextProps>({
  groupCreation: defaultGroupCreation,
  setGroupCreation: () => {},
});

export const GroupCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [groupCreation, setGroupCreation] = useState<GroupCreation>(defaultGroupCreation);

  return (
    <GroupCreationContext.Provider value={{ groupCreation, setGroupCreation }}>
      {children}
    </GroupCreationContext.Provider>
  );
};
