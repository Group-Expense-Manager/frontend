import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  NONE = 'NONE',
}

export type UserDetails = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bankAccountNumber?: string;
  preferredPaymentMethod: PaymentMethod;
  attachmentId: string;
};

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
    staleTime: 10 * 60 * 1000,
    retry: 10,
    retryDelay: (attempt) => {
      return Math.pow(2, attempt) * 100;
    },
  });
}
