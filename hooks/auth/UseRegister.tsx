import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { VerificationContext } from '@/context/verification/VerificationContext';

function useRegister(email: string, password: string) {
  const { setVerificationProps } = useContext(VerificationContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/open/register`,
        { email, password },
        {
          headers: {
            host: 'gem.web.authenticator.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
          },
        },
      );
    },
    onSuccess: () => {
      setVerificationProps({ email, code: '' });
      router.push('/verify');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        alert('Email zajęty! 409');
      } else if (error.response?.status === 400) {
        alert('Niepoprawny format emaila bądź hasła 400');
      } else {
        alert(`Niepoprawne dane ${error.response?.status}`);
      }
    },
  });
}

export default useRegister;
