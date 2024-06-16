import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { TOKEN_KEY, API_URL, AuthContext } from '@/context/AuthContext';
import { VerificationContext } from '@/context/VerificationContext';

function useLogin(email: string, password: string) {
  const { setVerificationProps } = useContext(VerificationContext);
  const { setAuthState } = useContext(AuthContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/open/login`,
        { email, password },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        setVerificationProps({ email, code: '' });
        router.push('/verify');
      }
    },
    onSuccess: (response: AxiosResponse<string>) => {
      const token = response.data;
      setAuthState({
        token,
        authenticated: true,
      });
      SecureStore.setItem(TOKEN_KEY, token);
      router.push('/homef');
    },
  });
}

export default useLogin;
