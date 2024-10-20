import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Settlement = {
  fromUserId: string;
  toUserId: string;
  value: number;
};

export type Settlements = {
  currency: string;
  settlements: Settlement[];
};

export type SettlementsList = {
  groupId: string;
  settlements: Settlements[];
};

export default function useSettlements(groupId?: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/settlements/groups/${groupId}`],
    queryFn: async (): Promise<SettlementsList> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/settlements/groups/${groupId}`,
        {
          headers: {
            host: HOST.FINANCE_ADAPTER,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
      return data;
    },
    enabled: !!groupId,
  });
}
