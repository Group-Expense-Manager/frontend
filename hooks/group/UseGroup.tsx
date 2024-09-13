import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type GroupDetails = {
  groupId: string;
  name: string;
  ownerId: string;
  members: Member[];
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

function useGroup(groupId: string) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/groups/${groupId}`],
    queryFn: async (): Promise<GroupDetails> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/groups/${groupId}`, {
        headers: {
          host: HOST.GROUP_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    refetchOnMount: false,
  });
}

export default useGroup;
