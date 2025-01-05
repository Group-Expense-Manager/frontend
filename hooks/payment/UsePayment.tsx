import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentType } from '@/context/payment/PaymentCreationContext';

export type Amount = {
  value: number;
  currency: string;
};

export type FxData = {
  targetCurrency: string;
  exchangeRate: number;
};

export type PaymentHistoryEntry = {
  participantId: string;
  paymentAction: 'CREATED' | 'EDITED' | 'DELETED' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  comment?: string;
};

export type Payment = {
  paymentId: string;
  creatorId: string;
  recipientId: string;
  title: string;
  type: PaymentType;
  amount: Amount;
  fxData?: FxData;
  createdAt: Date;
  updatedAt: Date;
  date: string;
  attachmentId?: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  history: PaymentHistoryEntry[];
};

export default function usePayment(paymentId: string) {
  const { authState, userData } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/payments/${paymentId}/groups/${userData.currentGroupId}`],
    queryFn: async (): Promise<Payment> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/payments/${paymentId}/groups/${userData.currentGroupId}`,
        {
          headers: {
            host: HOST.PAYMENT_MANAGER,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );

      return data;
    },
    staleTime: 10 * 60 * 1000,
    retry: 10,
    retryDelay: (attempt) => {
      return Math.pow(2, attempt) * 100;
    },
  });
}
