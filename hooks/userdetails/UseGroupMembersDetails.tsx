import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export interface GroupMemberDetails {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  attachmentId: string;
}

interface GroupMembersDetails {
  details: GroupMemberDetails[];
}

export default function useGroupMembersDetails(groupId: string) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/user-details/groups/${groupId}`],
    queryFn: async (): Promise<GroupMembersDetails> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/user-details/groups/${groupId}`,
        {
          headers: {
            host: HOST.USER_DETAILS_MANAGER,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
      return data;
    },
    refetchOnMount: false,
  });
}
