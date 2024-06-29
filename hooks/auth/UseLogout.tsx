import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { TOKEN_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

function useLogout() {
  const { setAuthState, setCurrentGroupId } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      queryClient.clear();
    },
    onError: (error: Error) => {
      console.error('Logout failed', error);
    },
    onSuccess: () => {
      setAuthState({
        token: null,
        authenticated: false,
      });
      setCurrentGroupId('');
      router.replace('/login');
    },
  });
}

export default useLogout;
