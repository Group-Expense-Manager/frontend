import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export default function (groupId: string) {
  const { authState, setUserData } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(`${API_URL}${PATHS.EXTERNAL}/groups/${groupId}`, {
        headers: {
          host: HOST.GROUP_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: async () => {
      await queryClient
        .invalidateQueries({
          queryKey: ['/groups'],
        })
        .then((r) => {
          setUserData({ currentGroupId: undefined });
          router.navigate(`/groups`);
        });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        router.replace(`/groups/${groupId}/can-not-delete-group-modal`);
      } else {
        router.replace(`/groups/${groupId}/error-modal`);
      }
    },
  });
}
