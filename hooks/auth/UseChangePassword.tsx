import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export default function useChangePassword(oldPassword: string, newPassword: string) {
  const { authState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            host: HOST.AUTHENTICATOR,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: () => {
      router.push('password-changed-successfully-modal');
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        router.push('wrong-old-password-modal');
      } else {
        router.push('error-modal');
      }
    },
  });
}
