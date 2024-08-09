import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import useLogout from '@/hooks/auth/UseLogout';

export default function You() {
  const { t } = useTranslation();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
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
          <CustomButton onPress={handleLogout} title={t('Logout')} type="reversed" />
        </View>
      </View>
    </SafeView>
  );
}
