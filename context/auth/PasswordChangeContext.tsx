import React, { createContext, FC, ReactNode, useState } from 'react';

export interface PasswordChangeProps {
  oldPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
}

interface PasswordChangeContextProps {
  passwordChangeProps: PasswordChangeProps;
  setPasswordChangeProps: (passwordChangeProps: PasswordChangeProps) => void;
}

const defaultPasswordChangeProps: PasswordChangeProps = {
  oldPassword: '',
  newPassword: '',
  repeatedNewPassword: '',
};

export const PasswordChangeContext = createContext<PasswordChangeContextProps>({
  passwordChangeProps: defaultPasswordChangeProps,
  setPasswordChangeProps: () => {},
});

export const PasswordChangeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [passwordChangeProps, setPasswordChangeProps] = useState<PasswordChangeProps>(
    defaultPasswordChangeProps,
  );

  return (
    <PasswordChangeContext.Provider value={{ passwordChangeProps, setPasswordChangeProps }}>
      {children}
    </PasswordChangeContext.Provider>
  );
};
