import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Balance = {
  userId: string;
  value: number;
};

export type Balances = {
  currency: string;
  userBalances: Balance[];
};

export type BalancesList = {
  groupId: string;
  balances: Balances[];
};

export default function useBalances(groupId?: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/balances/groups/${groupId}`],
    queryFn: async (): Promise<BalancesList> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/balances/groups/${groupId}`, {
        headers: {
          host: HOST.FINANCE_ADAPTER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    enabled: !!groupId,
  });
}
