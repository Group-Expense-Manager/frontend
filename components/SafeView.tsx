import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeViewProps {
  children: ReactElement;
}
const SafeView: React.FC<SafeViewProps> = ({ children }) => {
  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('#ffffff00');
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="bg-sky-lightest h-full p-[32px]">{children}</View>
      </SafeAreaView>
      <StatusBar translucent />
    </>
  );
};

export default SafeView;
