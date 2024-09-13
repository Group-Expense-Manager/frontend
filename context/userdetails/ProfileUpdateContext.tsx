import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

import { GlobalContext, PaymentMethod } from '@/context/GlobalContext';

export interface ProfileUpdate {
  userDetails: {
    username: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    bankAccountNumber?: string;
    preferredPaymentMethod: PaymentMethod;
  };
  profilePicture: {
    imageUri: string;
  };
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
  profilePicture: {
    imageUri: '',
  },

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
  const { userData } = useContext(GlobalContext);
  const [profileUpdate, setProfileUpdate] = useState<ProfileUpdate>({
    userDetails: {
      username: userData.userDetails.username,
      firstName: userData.userDetails.firstName,
      lastName: userData.userDetails.lastName,
      phoneNumber: userData.userDetails.phoneNumber,
      bankAccountNumber: userData.userDetails.bankAccountNumber,
      preferredPaymentMethod: userData.userDetails.preferredPaymentMethod,
    },
    profilePicture: {
      imageUri: userData.profilePicture.uri,
    },
    isValid: {
      username: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      bankAccountNumber: true,
    },
  });

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
