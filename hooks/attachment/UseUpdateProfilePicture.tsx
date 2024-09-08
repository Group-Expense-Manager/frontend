import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toByteArray } from 'base64-js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';

export default function useUpdateProfilePicture(inParallel: boolean = false) {
  const { authState, userData, setUserData } = useContext(GlobalContext);
  const { profileUpdate } = useContext(ProfileUpdateContext);

  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = profileUpdate.profilePicture.imageUri.split(',');
      const contentType = metadata.match(/:(.*?);/)![1];

      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/users/attachments/${userData.userDetails.attachmentId}`,
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
      setUserData({ ...userData, profilePicture: { uri: profileUpdate.profilePicture.imageUri } });
      if (!inParallel) {
        router.back();
      }
    },
    onError: () => {
      if (!inParallel) {
        router.push('/(you)/(modal)/error-modal');
      }
    },
  });
}
