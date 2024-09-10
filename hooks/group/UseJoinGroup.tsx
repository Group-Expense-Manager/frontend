import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupDetails } from '@/hooks/group/UseGroup';
import { Group } from '@/hooks/group/UseGroups';

function useJoinGroup(code: string) {
  const { authState, userData, setUserData } = useContext(GlobalContext);
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
      const newGroup: Group = {
        groupId: response.data.groupId,
        ownerId: response.data.ownerId,
        name: response.data.name,
        attachmentId: response.data.attachmentId,
      };
      const updatedGroups = userData.userGroups.concat([newGroup]);
      setUserData({ ...userData, currentGroup: newGroup, userGroups: updatedGroups });
      router.replace('/successfully-joined-group-modal');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 404) {
        router.replace('/(groups)/(modal)/error-modal');
      }
    },
  });
}

export default useJoinGroup;
