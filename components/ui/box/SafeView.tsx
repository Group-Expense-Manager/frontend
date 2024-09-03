import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeViewProps {
  children: ReactElement;
}

const SafeView: React.FC<SafeViewProps> = ({ children }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="bg-sky-lightest dark:bg-ink-darkest h-full px-[32px]">{children}</View>
      </SafeAreaView>
    </>
  );
};

export default SafeView;
