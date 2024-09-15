import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupDetails } from '@/hooks/group/UseGroup';

function useJoinGroup(isFirstGroup: boolean, code: string) {
  const { authState, setUserData } = useContext(GlobalContext);
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
      setUserData({ currentGroupId: response.data.groupId });

      if (isFirstGroup) {
        router.replace(`/groups/successfully-joined-first-group-modal`);
      } else {
        router.replace(`/groups/successfully-joined-group-modal`);
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 404 && error.response?.status !== 409) {
        if (isFirstGroup) {
          router.replace('/groups/first-group-error-modal');
        } else {
          router.replace('/groups/error-modal');
        }
      }
    },
  });
}

export default useJoinGroup;
