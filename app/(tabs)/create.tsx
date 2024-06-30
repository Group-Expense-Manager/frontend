import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';

export default function Create() {
  const { t } = useTranslation();
  return (
    <SafeView>
      <View className="py-[200px] w-full flex flex-col justify-center ">
        <View className="w-full">
          <CustomButton
            onPress={() => router.navigate('(stepper)/(expense-creation)/expense-group')}
            title={t('Add new expense')}
          />
        </View>
      </View>
    </SafeView>
  );
}
