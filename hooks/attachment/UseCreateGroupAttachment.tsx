import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { toByteArray } from 'base64-js';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';

interface AttachmentResponse {
  id: string;
}

export default function useCreateGroupAttachment() {
  const { authState } = useContext(GlobalContext);
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);

  return useMutation({
    mutationFn: () => {
      const [metadata, base64Data] = expenseCreation.attachment!.uri.split(',');
      const contentType = metadata.match(/:(.*?);/)![1];

      return axios.post(
        `${API_URL}${PATHS.EXTERNAL}/groups/${expenseCreation.groupId}`,
        toByteArray(base64Data),

        {
          headers: {
            host: HOST.ATTACHMENT_STORE,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
            'content-type': contentType,
          },
        },
      );
    },

    onSuccess: (response: AxiosResponse<AttachmentResponse>) => {
      setExpenseCreation({ ...expenseCreation, attachmentId: response.data.id });
    },
    onError: () => {
      router.push('/expenses/new/error-modal');
    },
  });
}
