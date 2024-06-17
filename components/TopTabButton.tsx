import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

export const TopTabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      className="flex items-center justify-center top-[-48px]">
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default TopTabButton;
