import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

export const TopTabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <SingleClickTouchableOpacity onPress={onPress} className="flex items-center justify-center">
      <View>{children}</View>
    </SingleClickTouchableOpacity>
  );
};

export default TopTabButton;
