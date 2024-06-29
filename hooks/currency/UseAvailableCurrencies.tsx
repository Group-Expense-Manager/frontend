import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL } from '@/constants/Api';
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
      const { data } = await axios.get(`${API_URL}/external/currencies`, {
        headers: {
          host: 'gem.web.currency-manager.com',
          'content-type': 'application/vnd.gem.internal.v1+json',
          authorization: `Bearer ${authState.token}`,
        },
      });
      return data;
    },
  });
}

export default useAvailableCurrencies;
