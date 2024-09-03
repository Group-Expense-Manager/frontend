import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { pl, registerTranslation } from 'react-native-paper-dates';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

const Welcome = () => {
  const { t } = useTranslation();

  registerTranslation('pl', pl);
  return (
    <SafeView>
      <>
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}>
          <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
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
                <CustomButton title={t('Next')} onPress={() => router.replace('/(auth)/login')} />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </SafeView>
  );
};

export default Welcome;
