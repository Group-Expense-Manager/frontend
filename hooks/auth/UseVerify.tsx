import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { API_URL, AuthContext, TOKEN_KEY } from '@/context/AuthContext';

function useVerify(email: string, code: string) {
  console.log(email);
  console.log(code);

  const { setAuthState } = useContext(AuthContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/open/verify`,
        { email, code },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<string>) => {
      setAuthState({
        token: response.data,
        authenticated: true,
      });
      SecureStore.setItem(TOKEN_KEY, response.data);
      router.push('/homef');
    },
  });
}

export default useVerify;
