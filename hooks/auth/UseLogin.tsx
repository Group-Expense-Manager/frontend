import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { TOKEN_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';
import { VerificationContext } from '@/context/VerificationContext';

function useLogin(email: string, password: string) {
  const { setVerificationProps } = useContext(VerificationContext);
  const { setAuthState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      console.log(email, password);
      return axios.post(
        `${API_URL}/open/login`,
        { email, password },
        {
          headers: {
            host: 'gem.web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    },
    onError: (error: AxiosError) => {
      console.log('Login error');
      console.log(error);
      console.log(error.response?.status);
      console.log(JSON.stringify(error.response?.data));
      if (error.response?.status === 403) {
        setVerificationProps({ email, code: '' });
        router.push('/verify');
      } else if (error.response?.status === 400) {
        alert('Niepoprawny email lub hasło!');
      }
    },
    onSuccess: (response: AxiosResponse<string>) => {
      console.log(response.data);
      console.log('Login success');
      const token = response.data;
      setAuthState({
        token,
        authenticated: true,
      });
      SecureStore.setItem(TOKEN_KEY, token);
      router.replace('/groups');
    },
  });
}

export default useLogin;
