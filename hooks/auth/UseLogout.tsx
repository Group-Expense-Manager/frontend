import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { AuthContext, TOKEN_KEY } from '@/context/AuthContext';

function useLogout() {
  const { setAuthState } = useContext(AuthContext);
  return useMutation({
    mutationFn: async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    },
    onError: (error: Error) => {
      console.error('Logout failed', error);
    },
    onSuccess: () => {
      setAuthState({
        token: null,
        authenticated: false,
      });
      router.push('/login');
    },
  });
}

export default useLogout;
