import { router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useUserDetails from '@/hooks/userdetails/UseUserDetails';
import { IconSize } from '@/util/IconSize';

export default function LoadingScreen() {
  const { data: userDetails, status: userDetailsStatus } = useUserDetails();
  const { data: profilePicture, status: profilePictureStatus } = useProfilePicture(
    userDetails?.attachmentId,
  );

  const { setUserData } = useContext(GlobalContext);

  useEffect(() => {
    if (userDetailsStatus === 'success' && profilePictureStatus === 'success') {
      setUserData({ currentGroupId: '', userDetails, profilePicture });
      router.replace('/groups');
    }
  }, [userDetailsStatus, profilePictureStatus]);

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex justify-center items-center">
        <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
      </View>
    </SafeView>
  );
}
