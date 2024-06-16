import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';
import { err } from 'react-native-svg';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Group = {
  groupId: string;
  name: string;
  attachmentId: string;
};

export type Groups = {
  groups: Group[];
};

function useGroups() {
  const { authState } = useContext(GlobalContext);

  return useQuery({
    queryKey: ['groups'],
    queryFn: async (): Promise<Groups> => {
      const { data } = await axios.get(`${API_URL}/external/groups`, {
        headers: {
          host: 'gem.web.group-manager.com',
          accept: 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
  });
}

export default useGroups;
