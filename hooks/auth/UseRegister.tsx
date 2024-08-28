import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { VerificationContext } from '@/context/auth/VerificationContext';

export default function useRegister(username: string, email: string, password: string) {
  const { verificationProps, setVerificationProps } = useContext(VerificationContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.OPEN}/register`,
        { username, email, password },
        {
          headers: {
            host: HOST.AUTHENTICATOR,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          },
        },
      );
    },
    onSuccess: () => {
      setVerificationProps({ ...verificationProps, email });
      router.push('verify-popover');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        router.push('email-address-taken-modal');
      } else {
        router.push('(auth)/(modal)/error-modal');
      }
    },
  });
}
