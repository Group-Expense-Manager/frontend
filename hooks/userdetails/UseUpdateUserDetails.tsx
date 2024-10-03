import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';
import { GroupDetails } from '@/hooks/group/UseGroup';
import { UserDetails } from '@/hooks/userdetails/UseUserDetails';

export default function useUpdateUserDetails(inParallel: boolean = false) {
  const { authState } = useContext(GlobalContext);
  const { profileUpdate } = useContext(ProfileUpdateContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(`${API_URL}${PATHS.EXTERNAL}/user-details`, profileUpdate.userDetails, {
        headers: {
          host: HOST.USER_DETAILS_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: (response: AxiosResponse<UserDetails>) => {
      queryClient.setQueryData(['/user-details'], (oldData: GroupDetails) => {
        return { ...oldData, ...response.data };
      });
      if (!inParallel) {
        router.back();
      }
    },
    onError: () => {
      if (!inParallel) {
        router.push('/you/edit-profile/(modal)/error-modal');
      }
    },
  });
}
