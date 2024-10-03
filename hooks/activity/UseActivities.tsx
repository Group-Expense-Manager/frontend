import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type ActivityListElement = {
  activityId: string;
  type: 'EXPENSE' | 'PAYMENT';
  creatorId: string;
  title: string;
  value: number;
  baseCurrency: string;
  targetCurrency: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  participantIds: string[];
  date: string;
};

export type Activities = {
  groupId: string;
  activities: ActivityListElement[];
};

export default function useActivities(groupId?: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/activities/groups/${groupId}`],
    queryFn: async (): Promise<Activities> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/activities/groups/${groupId}`, {
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
