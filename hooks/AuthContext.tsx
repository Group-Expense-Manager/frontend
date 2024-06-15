import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://192.168.55.13';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', token);
      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/open/register`, {email, password },
        {
          headers: {
            'host': 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    } catch (e) {
      return { error: true, msg: JSON.stringify((e as any).response.data.errors ) };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        `${API_URL}/open/login`,
        { email: email, password: password },
        {
          headers: {
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

      return result;
    } catch (e) {
      console.log(e);
      return { error: true, msg: (e as any).response };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
