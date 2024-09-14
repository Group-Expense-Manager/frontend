import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toByteArray } from 'base64-js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';

export default function useUpdateProfilePicture(
  inParallel: boolean = false,
  attachmentId?: string,
) {
  const { authState } = useContext(GlobalContext);
  const { profileUpdate } = useContext(ProfileUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = profileUpdate.profilePicture.uri.split(',');
      const contentType = metadata.match(/:(.*?);/)![1];

      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/users/attachments/${attachmentId}`,
        toByteArray(base64Data),

        {
          headers: {
            host: HOST.ATTACHMENT_STORE,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
            'content-type': contentType,
          },
        },
      );
    },
    onSuccess: () => {
      if (!inParallel) {
        router.back();
      }
      queryClient.invalidateQueries({
        queryKey: [`/users/${authState.userId}/attachments/${attachmentId}`],
      });
    },
    onError: () => {
      if (!inParallel) {
        router.push('/(you)/(modal)/error-modal');
      }
    },
  });
}
