import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toByteArray } from 'base64-js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupUpdateContext } from '@/context/group/GroupUpdateContext';

export default function useUpdateGroupPicture(
  inParallel: boolean = false,
  groupId: string,
  attachmentId?: string,
) {
  const { authState } = useContext(GlobalContext);
  const { groupUpdate } = useContext(GroupUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = groupUpdate.groupPicture.uri.split(',');
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

    onSuccess: () => {
      if (!inParallel) {
        router.back();
      }
      queryClient.invalidateQueries({
        queryKey: [`/groups/${groupId}/attachments/${attachmentId}`],
      });
    },
    onError: () => {
      if (!inParallel) {
        router.push(`/groups/${groupId}/details/(modal)/error-modal`);
      }
    },
  });
}
