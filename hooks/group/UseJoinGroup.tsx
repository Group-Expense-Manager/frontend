import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupDetails } from '@/hooks/group/UseGroup';

function useJoinGroup(code: string) {
  const { authState } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/groups/join/${code}`,
        {},
        {
          headers: {
            host: HOST.GROUP_MANAGER,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<GroupDetails>) => {
      queryClient.invalidateQueries({
        queryKey: [`/groups`],
      });
      router.replace(`/groups/${response.data.groupId}/successfully-joined-group-modal`);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 404) {
        router.replace('/groups/error-modal');
      }
    },
  });
}

export default useJoinGroup;
