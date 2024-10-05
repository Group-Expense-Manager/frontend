import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { PaymentMethod } from '@/hooks/userdetails/UseUserDetails';

export interface ProfileUpdate {
  userDetails: {
    username: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    bankAccountNumber?: string;
    preferredPaymentMethod: PaymentMethod;
  };
  profilePicture?: ImageBase64;
  isValid: {
    username: boolean;
    firstName: boolean;
    lastName: boolean;
    phoneNumber: boolean;
    bankAccountNumber: boolean;
  };
}

interface ProfileUpdateContextProps {
  profileUpdate: ProfileUpdate;
  setProfileUpdate: (profileUpdate: ProfileUpdate) => void;
}
export const defaultProfileUpdate: ProfileUpdate = {
  userDetails: {
    username: '',
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    bankAccountNumber: undefined,
    preferredPaymentMethod: PaymentMethod.NONE,
  },
  profilePicture: undefined,

  isValid: {
    username: true,
    firstName: true,
    lastName: true,
    phoneNumber: true,
    bankAccountNumber: true,
  },
};

export const ProfileUpdateContext = createContext<ProfileUpdateContextProps>({
  profileUpdate: defaultProfileUpdate,
  setProfileUpdate: () => {},
});

export const ProfileUpdateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profileUpdate, setProfileUpdate] = useState<ProfileUpdate>(defaultProfileUpdate);

  return (
    <ProfileUpdateContext.Provider
      value={{
        profileUpdate,
        setProfileUpdate,
      }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
