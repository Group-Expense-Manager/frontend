import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { toByteArray } from 'base64-js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

interface AttachmentResponse {
  id: string;
}

export default function useCreateGroupAttachment(
  groupId: string,
  attachment: ImageBase64,
  onSuccess: (id: string) => void,
) {
  const { authState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = attachment.uri.split(',');
      const contentType = metadata.match(/:(.*?);/)![1];

      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/groups/${groupId}`,
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

    onSuccess: (response: AxiosResponse<AttachmentResponse>) => {
      onSuccess(response.data.id);
    },
    onError: () => {
      router.push('/expenses/new/error-modal');
    },
  });
}
