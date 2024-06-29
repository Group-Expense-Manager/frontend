import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

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
