import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { UserDetails } from '@/hooks/userdetails/UseUserDetails';

export default function useGroupMemberDetails(groupId: string, groupMemberId?: string) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/user-details/${groupId}/members/${groupMemberId}`],
    queryFn: async (): Promise<UserDetails> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/user-details/groups/${groupId}/members/${groupMemberId}`,
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
    enabled: !!groupMemberId,
  });
}
