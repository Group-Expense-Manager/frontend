import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export type Currencies = {
  currencies: Currency[];
};

export type Currency = {
  code: string;
};

function useAvailableCurrencies() {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: ['availableCurrencies'],
    queryFn: async (): Promise<Currencies> => {
      const { data } = await axios.get(`${API_URL}${PATHS.EXTERNAL}/currencies`, {
        headers: {
          host: HOST.CURRENCY_MANAGER,
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

export default useAvailableCurrencies;
