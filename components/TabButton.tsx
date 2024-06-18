import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const TabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-grow items-center justify-center">
      {children}
    </TouchableOpacity>
  );
};

export default TabButton;
