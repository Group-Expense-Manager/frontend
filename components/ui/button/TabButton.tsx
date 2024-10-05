import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

export const TabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <SingleClickTouchableOpacity
      onPress={onPress}
      className="flex flex-grow items-center justify-center">
      <View className="w-full h-full flex items-center justify-center">{children}</View>
    </SingleClickTouchableOpacity>
  );
};

export default TabButton;
