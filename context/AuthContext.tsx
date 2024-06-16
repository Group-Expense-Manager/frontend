import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

export const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://192.168.55.13';

interface AuthState {
  token: string | null;
  authenticated: boolean;
}

const defaultAuthState: AuthState = {
  token: null,
  authenticated: false,
};

interface AuthContextProps {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: defaultAuthState,
  setAuthState: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', token);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>
  );
};
