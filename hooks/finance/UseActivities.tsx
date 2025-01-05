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
  currency: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  participantIds: string[];
  date: string;
};

export type Activities = {
  groupId: string;
  activities: ActivityListElement[];
};

export type ActivityFilters = {
  title?: string;
  status?: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  isCreator?: 'true' | 'false';
  type?: 'EXPENSE' | 'PAYMENT';
  currency?: string;
  sorted?: 'TITLE_ASCENDING' | 'TITLE_DESCENDING' | 'DATE_ASCENDING' | 'DATE_DESCENDING';
};

function getUrl(activityFilters: ActivityFilters, groupId?: string | null): string {
  let url = `${API_URL}${PATHS.EXTERNAL}/activities/groups/${groupId}?`;
  if (activityFilters.title) {
    url += `&title=${activityFilters.title}`;
  }
  if (activityFilters.status) {
    url += `&status=${activityFilters.status}`;
  }
  if (activityFilters.type) {
    url += `&type=${activityFilters.type}`;
  }
  if (activityFilters.isCreator) {
    url += `&isCreator=${activityFilters.isCreator}`;
  }

  if (activityFilters.currency) {
    url += `&currency=${activityFilters.currency}`;
  }

  if (activityFilters.sorted) {
    switch (activityFilters.sorted) {
      case 'TITLE_ASCENDING':
        url += `&sortedBy=TITLE&sortOrder=ASCENDING`;
        break;
      case 'TITLE_DESCENDING':
        url += `&sortedBy=TITLE&sortOrder=DESCENDING`;
        break;
      case 'DATE_ASCENDING':
        url += `&sortedBy=DATE&sortOrder=ASCENDING`;
        break;
      case 'DATE_DESCENDING':
        url += `&sortedBy=DATE&sortOrder=DESCENDING`;
        break;
    }
  }
  return url;
}

function getKey(activityFilters: ActivityFilters, groupId?: string | null): string[] {
  const key = [`/activities/groups/${groupId}`];
  if (activityFilters.title) {
    key.push(activityFilters.title);
  }
  if (activityFilters.status) {
    key.push(activityFilters.status);
  }
  if (activityFilters.type) {
    key.push(activityFilters.type);
  }
  if (activityFilters.isCreator) {
    key.push(activityFilters.isCreator);
  }
  if (activityFilters.currency) {
    key.push(activityFilters.currency);
  }
  if (activityFilters.sorted) {
    key.push(activityFilters.sorted);
  }

  return key;
}

export default function useActivities(activityFilters: ActivityFilters, groupId?: string | null) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: getKey(activityFilters, groupId),
    queryFn: async (): Promise<Activities> => {
      if (!groupId) {
        throw new Error('groupId is required');
      }

      const { data } = await axios.get(getUrl(activityFilters, groupId), {
        headers: {
          host: HOST.FINANCE_ADAPTER,
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
