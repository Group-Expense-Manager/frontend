import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';

export default function useSendVerificationEmail(email: string) {
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.OPEN}/send-verification-email`,
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
      router.push('verification-email-sent-modal');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 429) {
        router.push('verification-email-already-sent-modal');
      } else {
        router.push('error-modal');
      }
    },
  });
}
