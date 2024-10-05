import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupCreationContext } from '@/context/group/GroupCreationContext';
import { GroupDetails } from '@/hooks/group/UseGroup';

export default function useCreateGroup() {
  const { authState, setUserData } = useContext(GlobalContext);
  const { groupCreation } = useContext(GroupCreationContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}${PATHS.EXTERNAL}/groups`, groupCreation, {
        headers: {
          host: HOST.GROUP_MANAGER,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: (response: AxiosResponse<GroupDetails>) => {
      queryClient.setQueryData([`/groups/${response.data.groupId}`], () => {
        return response.data;
      });
      queryClient.invalidateQueries({
        queryKey: [`/groups`],
      });
      setUserData({ currentGroupId: response.data.groupId });

      router.navigate('/groups');
    },
    onError: () => {
      router.push('/groups/new/error-modal');
    },
  });
}
