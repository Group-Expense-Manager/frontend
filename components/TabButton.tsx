import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const TabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-grow items-center justify-center">
      <View className="w-full h-full flex items-center justify-center">{children}</View>
    </TouchableOpacity>
  );
};

export default TabButton;
