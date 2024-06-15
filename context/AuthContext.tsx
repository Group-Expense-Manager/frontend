import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { VerificationContext } from '@/context/VerificationContext';

const TOKEN_KEY = 'my-jwt';
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
  onRegister: (email: string, password: string) => Promise<void>;
  onVerify: (email: string, code: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: defaultAuthState,
  onRegister: async () => {},
  onVerify: async () => {},
  onLogin: async () => {},
  onLogout: async () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const { setVerificationProps } = useContext(VerificationContext);

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

  const register = async (email: string, password: string): Promise<void> => {
    try {
      const result = await axios.post(
        `${API_URL}/open/register`,
        { email, password },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
      console.log('udana rejestracja');
      if (result.status === 201) {
        setVerificationProps({ email, code: '' });
        router.push('/verify');
      }
    } catch (e) {}
  };

  const verify = async (email: string, code: string): Promise<void> => {
    try {
      console.log('sending');
      const result = await axios.post(
        `${API_URL}/open/verify`,
        { email, code },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
      console.log('verify result: ', result);

      setAuthState({
        token: result.data,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data);

      return result.data;
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const result = await axios.post(
        `${API_URL}/open/login`,
        { email, password },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
      console.log('login result: ', result);

      setAuthState({
        token: result.data,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data);

      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        setVerificationProps({ email, code: '' });
        router.push('/verify');
      } else {
        console.error('Login error:', error);
      }
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        onRegister: register,
        onVerify: verify,
        onLogin: login,
        onLogout: logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
