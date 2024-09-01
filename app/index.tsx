import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlobalContext } from '@/context/GlobalContext';

export default function Index() {
  const { loading, authState } = useContext(GlobalContext);
  if (!loading && !authState.authenticated) return <Redirect href="welcome" />;
  if (!loading && authState.authenticated) return <Redirect href="loading-user-data" />;

  return (
    <SafeAreaView>
      <View className="bg-sky-lightest" />
    </SafeAreaView>
  );
}
