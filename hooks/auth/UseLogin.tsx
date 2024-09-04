import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { TOKEN_KEY, USER_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';
import { VerificationContext } from '@/context/auth/VerificationContext';

export default function useLogin(email: string, password: string) {
  const { setAuthState } = useContext(GlobalContext);
  const { verificationProps, setVerificationProps } = useContext(VerificationContext);

  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.OPEN}/login`,
        { email, password },
        {
          headers: {
            host: HOST.AUTHENTICATOR,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          },
        },
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        setVerificationProps({ ...verificationProps, email });
        router.push('/verify-popover');
      } else if (error.response?.status === 400) {
        router.push('/wrong-credentials-modal');
      } else {
        router.push('/(auth)/(modal)/error-modal');
      }
    },
    onSuccess: (response: AxiosResponse<LoginResponse>) => {
      setAuthState({
        userId: response.data.userId,
        token: response.data.token,
        authenticated: true,
      });
      SecureStore.setItem(USER_KEY, response.data.userId);
      SecureStore.setItem(TOKEN_KEY, response.data.token);
      router.replace('/loading-user-data');
    },
  });
}

interface LoginResponse {
  userId: string;
  token: string;
}
