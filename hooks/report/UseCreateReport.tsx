import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ReportCreationContext } from '@/context/report/ReportCreationContext';

export default function useCreateReport() {
  const { authState } = useContext(GlobalContext);
  const { reportCreation } = useContext(ReportCreationContext);

  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/generate/groups/${reportCreation.groupId}?format=${reportCreation.format}`,
        {},
        {
          headers: {
            host: HOST.REPORT_CREATOR,
            authorization: `Bearer ${authState.token}`,
          },
        },
      );
    },
    onSuccess: () => {
      router.push('/reports/new/report-created-modal');
    },
    onError: () => {
      router.push('/reports/new/error-modal');
    },
  });
}
