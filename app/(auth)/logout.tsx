import { useEffect } from 'react';
import { View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import useLogout from '@/hooks/auth/UseLogout';
import { IconSize } from '@/util/IconSize';

export default function LoadingScreen() {
  const { mutate: logout } = useLogout();

  useEffect(() => {
    logout();
  }, []);

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex justify-center items-center">
        <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
      </View>
    </SafeView>
  );
}
