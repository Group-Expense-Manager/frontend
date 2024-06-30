import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const TopTabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex items-center justify-center">
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default TopTabButton;
