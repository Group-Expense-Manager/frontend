import { router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroups from '@/hooks/group/UseGroups';
import useUserDetails from '@/hooks/userdetails/UseUserDetails';
import { IconSize } from '@/util/IconSize';

export default function LoadingScreen() {
  const { authState, setUserData } = useContext(GlobalContext);

  const { data: userDetails, status: userDetailsStatus } = useUserDetails();
  const { status: profilePictureStatus } = useProfilePicture(
    authState.userId,
    userDetails?.attachmentId,
  );
  const { data: userGroups, status: userGroupsStatus } = useGroups();

  useEffect(() => {
    if (
      userDetailsStatus === 'success' &&
      profilePictureStatus === 'success' &&
      userGroupsStatus === 'success'
    ) {
      setUserData({
        currentGroupId: !userGroups.length ? null : userGroups[0],
      });
      router.replace('/groups');
    }
  }, [userDetailsStatus, profilePictureStatus, userGroupsStatus]);

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex justify-center items-center">
        <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
      </View>
    </SafeView>
  );
}
