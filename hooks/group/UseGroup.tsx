import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

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

function useGroup(groupId?: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/groups/${groupId}`],
    queryFn: async (): Promise<GroupDetails> => {
      if (!groupId) {
        throw new Error('groupId is required');
      }
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/groups/${groupId}`, {
        headers: {
          host: HOST.GROUP_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    staleTime: 10 * 60 * 1000,
    retry: 10,
    retryDelay: (attempt) => {
      return Math.pow(2, attempt) * 100;
    },
  });
}

export default useGroup;
