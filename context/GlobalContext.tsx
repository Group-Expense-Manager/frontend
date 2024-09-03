import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { useColorScheme } from 'nativewind';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
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

enum PaymentMethod {
  CASH,
  BANK_TRANSFER,
  MOBILE_PAYMENT,
  NONE,
}

export type UserDetails = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bankAccountNumber?: string;
  preferredPaymentMethod: PaymentMethod;
  attachmentId: string;
};

interface UserData {
  currentGroupId?: string;
  userDetails: UserDetails;
  profilePicture: ImageBase64;
}

export const defaultUserData: UserData = {
  currentGroupId: undefined,
  userDetails: {
    id: '',
    username: '',
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    bankAccountNumber: undefined,
    preferredPaymentMethod: PaymentMethod.NONE,
    attachmentId: '',
  },
  profilePicture: {
    uri: '',
  },
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
      const rawMode = await SecureStore.getItemAsync(MODE_KEY);
      const rawLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY);

      const mode: 'light' | 'dark' | 'system' =
        rawMode === 'light' || rawMode === 'dark' || rawMode === 'system' ? rawMode : 'system';

      await i18n.changeLanguage(rawLanguage ? rawLanguage : undefined);
      setColorScheme(mode);

      setPreferences({
        mode,
        language: i18n.language,
      });
    };
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userId = await SecureStore.getItemAsync(USER_KEY);
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
