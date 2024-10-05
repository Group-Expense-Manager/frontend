import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { useColorScheme } from 'nativewind';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { LANGUAGE_KEY, MODE_KEY, TOKEN_KEY, USER_KEY } from '@/constants/Storage';

interface AuthState {
  userId: string | null;
  token: string | null;
  authenticated: boolean;
}

const defaultAuthState: AuthState = {
  userId: null,
  token: null,
  authenticated: false,
};

interface Preferences {
  mode: 'light' | 'dark' | 'system';
  language: string;
}

const defaultPreferences: Preferences = {
  mode: 'system',
  language: 'pl',
};

interface UserData {
  currentGroupId: string | null | undefined;
}

export const defaultUserData: UserData = {
  currentGroupId: undefined,
};

interface GlobalContextProps {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  userData: UserData;
  setUserData: (userData: UserData) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  authState: defaultAuthState,
  setAuthState: () => {},
  loading: true,
  setLoading: () => {},
  preferences: defaultPreferences,
  setPreferences: () => {},
  userData: defaultUserData,
  setUserData: () => {},
});

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const loadPreferences = async () => {
      const rawMode = await SecureStore.getItemAsync(MODE_KEY).catch(() => {
        return null;
      });
      const rawLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY).catch(() => {
        return null;
      });
      const mode: 'light' | 'dark' | 'system' =
        rawMode === 'light' || rawMode === 'dark' || rawMode === 'system' ? rawMode : 'system';

      if (rawLanguage) {
        await i18n.changeLanguage(rawLanguage);
      }
      setColorScheme(mode);
      setPreferences({
        mode,
        language: i18n.language,
      });
    };
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY).catch(() => {
        return null;
      });
      const userId = await SecureStore.getItemAsync(USER_KEY).catch(() => {
        return null;
      });
      if (token && userId) {
        setAuthState({
          userId,
          token,
          authenticated: true,
        });
      }
    };

    async function initializeApp() {
      await loadToken();
      await loadPreferences();
    }

    initializeApp().then(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        setAuthState,
        loading,
        setLoading,
        preferences,
        setPreferences,
        userData,
        setUserData,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
