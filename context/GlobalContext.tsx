import * as SecureStore from 'expo-secure-store';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { TOKEN_KEY } from '@/constants/Storage';

interface AuthState {
  token: string | null;
  authenticated: boolean;
}

const defaultAuthState: AuthState = {
  token: null,
  authenticated: false,
};

interface GlobalContextProps {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentGroupId: string;
  setCurrentGroupId: (currentGroupId: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  authState: defaultAuthState,
  setAuthState: () => {},
  loading: true,
  setLoading: () => {},
  currentGroupId: '',
  setCurrentGroupId: () => {},
});

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const [loading, setLoading] = useState(true);
  const [currentGroupId, setCurrentGroupId] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken().then(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authState, setAuthState, loading, setLoading, currentGroupId, setCurrentGroupId }}>
      {children}
    </GlobalContext.Provider>
  );
};
