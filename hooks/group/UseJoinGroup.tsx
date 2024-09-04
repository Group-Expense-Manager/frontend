import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

function useJoinGroup(code: string) {
  const { authState } = useContext(GlobalContext);
  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}/external/groups/join/${code}`,
        {},
        {
          headers: {
            host: 'gem.web.group-manager.com',
            'content-type': 'application/vnd.gem.internal.v1+json',
            accept: 'application/vnd.gem.internal.v1+json',
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: () => {
      router.replace('/groups');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        alert('Błędny kod 404');
      } else {
        alert(`Niepoprawne dane ${error.response?.status}`);
      }
    },
  });
}

export default useJoinGroup;
