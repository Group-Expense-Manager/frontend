import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext, UserDetails } from '@/context/GlobalContext';

export default function useUserDetails() {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: ['/user-details'],
    queryFn: async (): Promise<UserDetails> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/user-details`, {
        headers: {
          host: HOST.USER_DETAILS_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
    refetchOnMount: false,
  });
}
