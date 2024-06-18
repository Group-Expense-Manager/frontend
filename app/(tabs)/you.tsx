import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components';
import SafeView from '@/components/SafeView';
import useLogout from '@/hooks/auth/UseLogout';

export default function You() {
  const { t } = useTranslation();
  const { mutate, isSuccess, isError, error, data } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <SafeView>
      <View className="py-[200px] w-full flex flex-col justify-center ">
        <View className="w-full">
          <CustomButton onPress={handleLogout} title={t('Logout')} />
        </View>
      </View>
    </SafeView>
  );
}
