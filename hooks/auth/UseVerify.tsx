import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { TOKEN_KEY, USER_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

export default function useVerify(email: string, code: string) {
  const { setAuthState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.OPEN}/verify`,
        { email, code },
        {
          headers: {
            host: HOST.AUTHENTICATOR,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<VerifyResponse>) => {
      setAuthState({
        userId: response.data.userId,
        token: response.data.token,
        authenticated: true,
      });
      SecureStore.setItem(USER_KEY, response.data.userId);
      SecureStore.setItem(TOKEN_KEY, response.data.token);
      router.replace('/groups');
    },

    onError: (error: AxiosError) => {
      if (error.response?.status !== 400) {
        router.push('error-modal');
      }
    },
  });
}
interface VerifyResponse {
  userId: string;
  token: string;
}
