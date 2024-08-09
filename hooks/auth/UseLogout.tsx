import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { TOKEN_KEY, USER_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

export default function useLogout() {
  const { setAuthState, setCurrentGroupId } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      queryClient.clear();
      setAuthState({
        userId: null,
        token: null,
        authenticated: false,
      });
      setCurrentGroupId('');
    },
    onError: (error: Error) => {
      console.error('Logout failed', error);
    },
    onSuccess: () => {
      while (router.canGoBack()) {
        router.back();
      }
      router.replace('/login');
    },
  });
}
