import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { TOKEN_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

function useVerify(email: string, code: string) {
  console.log(email);
  console.log(code);

  const { setAuthState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/open/verify`,
        { email, code },
        {
          headers: {
            host: 'gem.web.authenticator.com',
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
      router.replace('/groups');
    },

    onError: (error: AxiosError) => {
      console.log(error.response?.status);
      console.log(JSON.stringify(error.response?.data));
      if (error.response?.status === 400) {
        alert('Niepoprawny kod');
      }
    },
  });
}

export default useVerify;
