import React, { createContext, useState, ReactNode, FC } from 'react';

interface GlobalContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const VerificationContext = createContext<GlobalContextProps>({
  loading: true,
  setLoading: () => {},
});

export const VerificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <VerificationContext.Provider value={{ loading, setLoading }}>
      {children}
    </VerificationContext.Provider>
  );
};
