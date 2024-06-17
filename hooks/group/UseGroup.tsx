import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Group = {
  groupId: string;
  name: string;
  ownerId: string;
  members: Member[];
  acceptRequired: boolean;
  groupCurrencies: Currency[];
  joinCode: string;
  attachmentId: string;
};

export type Member = {
  userId: string;
};

export type Currency = {
  code: string;
};

function useGroup(groupId: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: ['groups/${groupId}'],
    queryFn: async (): Promise<Group> => {
      const { data } = await axios.get(`${API_URL}/external/groups/${groupId}`, {
        headers: {
          host: 'gem.web.group-manager.com',
          accept: 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
      console.log(`got group data for id ${groupId}`);

      return data;
    },
    enabled: !!groupId,
  });
}

export default useGroup;
