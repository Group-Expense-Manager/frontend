import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import 'intl-pluralrules';
import './i18n';
import { CustomButton, Loader } from '@/components';
import { GlobalContext } from '@/context/GlobalContext';

const Welcome = () => {
  const { loading, authState } = useContext(GlobalContext);

  console.log('hello');
  console.log(authState.authenticated);
  console.log(authState.token);

  if (!loading && authState.authenticated) return <Redirect href="/(tabs)/you" />;

  return (
    <SafeAreaView className="bg-sky-lightest h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-title3 text-ink-darkest font-bold text-center">
              Welcome to best {'\n'}
              Group Expense Manager {'\n'}
              <Text className="text-primary-base">GEM</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-ink-darkest mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/(auth)/login')}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
