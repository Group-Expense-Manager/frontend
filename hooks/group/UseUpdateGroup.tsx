import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupUpdateContext } from '@/context/group/GroupUpdateContext';
import { GroupDetails } from '@/hooks/group/UseGroup';

export default function (inParallel: boolean = false, groupId: string) {
  const { authState } = useContext(GlobalContext);
  const { groupUpdate } = useContext(GroupUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(
        `${API_URL}${PATHS.EXTERNAL}/groups/${groupId}`,
        {
          name: groupUpdate.groupName,
          groupCurrencies: [{ code: 'PLN' }],
        },
        {
          headers: {
            host: HOST.GROUP_MANAGER,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: (response: AxiosResponse<GroupDetails>) => {
      queryClient.invalidateQueries({
        queryKey: [`/groups`],
      });
      queryClient.setQueryData([`/groups/${groupId}`], (oldData: GroupDetails) => {
        return { ...oldData, ...response.data };
      });

      if (!inParallel) {
        router.back();
      }
    },
    onError: () => {
      if (!inParallel) {
        router.push(`/groups/${groupId}/details/(modal)/error-modal`);
      }
    },
  });
}
