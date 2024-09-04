import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';

export default function useRecoverPassword(email: string) {
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.OPEN}/recover-password`,
        { email },
        {
          headers: {
            host: HOST.AUTHENTICATOR,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          },
        },
      );
    },
    onSuccess: () => {
      router.replace('/password-recovery-email-sent-modal');
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 404 || error.response?.status === 429) {
        router.replace('/password-recovery-email-sent-modal');
      } else {
        router.replace('/(auth)/(modal)/error-modal');
      }
    },
  });
}
