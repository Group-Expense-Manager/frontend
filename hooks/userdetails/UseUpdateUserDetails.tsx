import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useContext } from 'react';

import { API_URL, APPLICATION_JSON_INTERNAL_VER_1, HOST, PATHS } from '@/constants/Api';
import { GlobalContext, UserDetails } from '@/context/GlobalContext';
import { ProfileUpdateContext } from '@/context/userdetails/ProfileUpdateContext';

export default function useUpdateUserDetails() {
  const { authState, userData, setUserData } = useContext(GlobalContext);
  const { profileUpdate } = useContext(ProfileUpdateContext);
  return useMutation({
    mutationFn: () => {
      return axios.put(`${API_URL}${PATHS.EXTERNAL}/user-details`, profileUpdate.userDetails, {
        headers: {
          host: HOST.USER_DETAILS_MANAGER,
          accept: APPLICATION_JSON_INTERNAL_VER_1,
          'content-type': APPLICATION_JSON_INTERNAL_VER_1,
          authorization: `Bearer ${authState.token}`,
        },
      });
    },
    onSuccess: (response: AxiosResponse<UserDetails>) => {
      const updatedUserDetails: UserDetails = {
        id: userData.userDetails.id,
        username: response.data.username,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        bankAccountNumber: response.data.bankAccountNumber,
        preferredPaymentMethod: response.data.preferredPaymentMethod,
        attachmentId: userData.userDetails.attachmentId,
      };
      setUserData({ ...userData, userDetails: updatedUserDetails });
      router.back();
    },
    onError: () => {
      router.push('/(you)/(modal)/error-modal');
    },
  });
}
