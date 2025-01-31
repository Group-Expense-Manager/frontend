import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ReportCreationContext } from '@/context/report/ReportCreationContext';

export default function useCreateReport() {
  const { authState } = useContext(GlobalContext);
  const { reportCreation } = useContext(ReportCreationContext);

  return useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/generate/groups/${reportCreation.groupId}`,
        {
          title: reportCreation.title,
          format: reportCreation.format,
        },
        {
          headers: {
            host: HOST.REPORT_CREATOR,
            authorization: `Bearer ${authState.token}`,
            'content-type': APPLICATION_JSON_INTERNAL_VER_1,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
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
