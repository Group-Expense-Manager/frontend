import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { VerificationContext } from '@/context/VerificationContext';

function useRegister(email: string, password: string) {
  const { setVerificationProps } = useContext(VerificationContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/open/register`,
        { email, password },
        {
          headers: {
            host: 'web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    },
    onSuccess: () => {
      setVerificationProps({ email, code: '' });
      router.push('/verify');
    },
  });
}

export default useRegister;
