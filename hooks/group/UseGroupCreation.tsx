import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupCreationProps } from '@/context/GroupCreationContext';

function useGroupCreation(): (groupCreationProps: GroupCreationProps) => void {
  const { authState } = useContext(GlobalContext);

  const mutation = useMutation({
    mutationFn: (groupCreationProps: GroupCreationProps) => {
      console.log(groupCreationProps);
      return axios.post(`${API_URL}/external/groups`, groupCreationProps, {
        headers: {
          host: 'gem.web.group-manager.com',
          'content-type': 'application/vnd.gem.internal.v1+json',
          accept: 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: () => {
      router.replace('/(tabs)/groups');
    },
    onError: (error: AxiosError) => {
      alert('Niepoprawne dane');
      console.log(error.response?.status);
      console.log(JSON.stringify(error.response?.data));
    },
  });

  return (groupCreationProps: GroupCreationProps) => {
    mutation.mutate(groupCreationProps);
  };
}

export default useGroupCreation;
