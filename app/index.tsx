import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import 'intl-pluralrules';
import './i18n';
import { CustomButton, Loader } from '@/components';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';

const Welcome = () => {
  const { t } = useTranslation();
  const { loading, authState } = useContext(GlobalContext);
  if (!loading && authState.authenticated) return <Redirect href="/(tabs)/groups" />;

  return (
    <SafeAreaView className="bg-sky-lightest h-full p-[32px]">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex justify-center items-center h-fit">
            <Text className="text-title3 text-ink-darkest font-bold text-center">
              {t('Welcome to best')} {'\n'}
              {t('Group Expense Manager')} {'\n'}
              <Text className="text-primary-base">{t('GEM')}</Text>
            </Text>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-8">
            <View className="h-fit w-full">
              <CustomButton title={t('Next')} handlePress={() => router.push('/(auth)/login')} />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
