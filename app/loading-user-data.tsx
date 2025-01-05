import { router } from 'expo-router';
import { useContext, useEffect, useState, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

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

  const [rotateAnim] = useState(new Animated.Value(0));
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.bezier(0.7, 0.3, 0.5, 1),
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ]),
    );
    animationRef.current.start();

    if (
      userDetailsStatus === 'success' &&
      profilePictureStatus === 'success' &&
      userGroupsStatus === 'success'
    ) {
      setUserData({
        currentGroupId: !userGroups.length ? null : userGroups[0].groupId,
      });
      router.replace('/groups');
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [rotateAnim, userDetailsStatus, profilePictureStatus, userGroupsStatus]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex justify-center items-center">
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
          }}>
          <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
        </Animated.View>
      </View>
    </SafeView>
  );
}
