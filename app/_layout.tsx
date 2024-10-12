import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from '@/constants/Colors';
import { GlobalProvider } from '@/context/GlobalContext';

const client = new QueryClient();

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
    'Sora-ExtraBold': require('../assets/fonts/Sora-ExtraBold.ttf'),
    'Sora-ExtraLight': require('../assets/fonts/Sora-ExtraLight.ttf'),
    'Sora-Light': require('../assets/fonts/Sora-Light.ttf'),
    'Sora-Medium': require('../assets/fonts/Sora-Medium.ttf'),
    'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
    'Sora-SemiBold': require('../assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Thin': require('../assets/fonts/Sora-Thin.ttf'),
  });

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <GlobalProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <View className="flex-1">
              <StatusBar
                backgroundColor={colorScheme === 'light' ? theme.sky.lightest : theme.ink.darkest}
                style={colorScheme === 'light' ? 'dark' : 'light'}
              />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="you" options={{ headerShown: false }} />
                <Stack.Screen name="groups" options={{ headerShown: false }} />
                <Stack.Screen name="expenses" options={{ headerShown: false }} />
                <Stack.Screen name="payments" options={{ headerShown: false }} />
                <Stack.Screen name="reports/new" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="loading-user-data"
                  options={{ headerShown: false, animation: 'none' }}
                />
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
              </Stack>
            </View>
          </SafeAreaProvider>
        </PaperProvider>
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
