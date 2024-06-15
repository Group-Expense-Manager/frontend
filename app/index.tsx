import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import 'intl-pluralrules';
import './i18n';
import { useAuth } from '@/hooks/UseAuth';

const Welcome = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) {
    return <Redirect href="/(tabs)/homef" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
};

export default Welcome;
