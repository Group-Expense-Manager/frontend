import React, { createContext, FC, ReactNode, useState } from 'react';

interface VerificationProps {
  email: string;
  code: string;
}

interface VerificationContextProps {
  verificationProps: VerificationProps;
  setVerificationProps: (verificationProps: VerificationProps) => void;
}

const defaultVerificationProps: VerificationProps = {
  email: '',
  code: '',
};

export const VerificationContext = createContext<VerificationContextProps>({
  verificationProps: defaultVerificationProps,
  setVerificationProps: () => {},
});

export const VerificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [verificationProps, setVerificationProps] =
    useState<VerificationProps>(defaultVerificationProps);

  return (
    <VerificationContext.Provider value={{ verificationProps, setVerificationProps }}>
      {children}
    </VerificationContext.Provider>
  );
};
