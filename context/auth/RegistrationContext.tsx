import React, { createContext, FC, ReactNode, useState } from 'react';

export interface RegistrationProps {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

interface RegistrationContextProps {
  registrationProps: RegistrationProps;
  setRegistrationProps: (registerProps: RegistrationProps) => void;
}

const defaultRegistrationProps: RegistrationProps = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
};

export const RegistrationContext = createContext<RegistrationContextProps>({
  registrationProps: defaultRegistrationProps,
  setRegistrationProps: () => {},
});

export const RegistrationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [registrationProps, setRegistrationProps] =
    useState<RegistrationProps>(defaultRegistrationProps);

  return (
    <RegistrationContext.Provider value={{ registrationProps, setRegistrationProps }}>
      {children}
    </RegistrationContext.Provider>
  );
};
