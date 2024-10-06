import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { toByteArray } from 'base64-js';
import { useContext } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { AttachmentResponse } from '@/hooks/attachment/UseCreateGroupAttachment';

export default function useUpdateGroupAttachment(
  groupId: string,
  attachment: ImageBase64,
  attachmentId: string,
  onSuccess: (id: string) => void,
  onError: () => void,
) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = attachment.uri.split(',');
      const contentType = metadata.match(/:(.*?);/)![1];

      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/groups/${groupId}/attachments/${attachmentId}`,
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
      queryClient.invalidateQueries({
        queryKey: [`/groups/${groupId}/attachments/${attachmentId}`],
      });
      onSuccess(response.data.id);
    },
    onError,
  });
}
