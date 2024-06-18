import React, { ReactElement } from 'react';
import { View } from 'react-native';

import theme from '@/constants/Colors';

interface TopTabIconProps {
  focused: boolean;
  children: ReactElement;
}

export const TopTabIcon: React.FC<TopTabIconProps> = ({ focused, children }) => {
  const clonedIcon = React.cloneElement(children, {
    width: 40,
    height: 40,
    stroke: focused ? theme.sky.lightest : theme.sky.dark,
  });
  const backgroundColor = focused
    ? 'bg-primary-base border-primary-base'
    : 'bg-sky-lightest border-sky-dark';
  return (
    <View
      className={`flex items-center justify-center top-[-38px] rounded-[25px] w-[50px] h-[50px] border-[3px] border-e-2 ${backgroundColor}`}>
      {clonedIcon}
    </View>
  );
};

export default TopTabIcon;
