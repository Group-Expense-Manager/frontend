import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Group = {
  groupId: string;
  ownerId: string;
  name: string;
  attachmentId: string;
};

export type Groups = {
  groups: Group[];
};

function useGroups() {
  const { authState } = useContext(GlobalContext);

  return useQuery({
    queryKey: ['/groups'],
    queryFn: async (): Promise<Groups> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/groups`, {
        headers: {
          host: HOST.GROUP_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
  });
}

export default useGroups;
