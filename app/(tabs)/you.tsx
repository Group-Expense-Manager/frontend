import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import CustomHeader from '@/components/ui/header/CustomHeader';
import useLogout from '@/hooks/auth/UseLogout';
import { ButtonType } from '@/util/ButtonType';

export default function You() {
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();

  return (
    <SafeView>
      <View className="py-[32px] w-full h-full flex flex-col justify-between items-center space-y-[32px]">
        <View className="w-full">
          <CustomButton
            onPress={() => router.push('change-password-old')}
            title={t('Change password')}
          />
        </View>
        <View className="w-full">
          <CustomButton onPress={() => logout()} title={t('Logout')} type={ButtonType.OUTLINED} />
        </View>
        <CustomHeader title="HJHO" />
      </View>
    </SafeView>
  );
}
