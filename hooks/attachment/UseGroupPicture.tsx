import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext } from '@/context/GlobalContext';

export default function useGroupPicture(groupId: string, attachmentId?: string) {
  const { authState } = useContext(GlobalContext);
  return useQuery({
    queryKey: [`/groups/${groupId}/attachments/${attachmentId}`],
    queryFn: async (): Promise<ImageBase64> => {
      const { data } = await axios.get(
        `${API_URL}${PATHS.EXTERNAL}/groups/${groupId}/attachments/${attachmentId}`,
        {
          headers: {
            host: HOST.ATTACHMENT_STORE,
            accept: APPLICATION_JSON_INTERNAL_VER_1,
            authorization: `Bearer ${authState.token}`,
          },
          responseType: 'blob',
        },
      );
      const reader = new FileReader();
      const blobPromise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(data);
      });

      const base64Data = await blobPromise;

      return {
        uri: base64Data,
      };
    },
    refetchOnMount: false,
    enabled: !!attachmentId,
  });
}
