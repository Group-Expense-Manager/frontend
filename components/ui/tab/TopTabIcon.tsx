import React, { ReactElement } from 'react';
import { View } from 'react-native';

import theme from '@/constants/Colors';
import { IconSize } from '@/util/IconSize';

interface TopTabIconProps {
  focused: boolean;
  children: ReactElement;
}

export const TopTabIcon: React.FC<TopTabIconProps> = ({ focused, children }) => {
  const clonedIcon = React.cloneElement(children, {
    width: IconSize.SMALL,
    height: IconSize.SMALL,
    stroke: theme.sky.lightest,
  });
  const backgroundColor = focused ? 'bg-primary-dark' : 'bg-primary-base';
  return (
    <View
      className={`flex items-center justify-center top-[-30px] rounded-[24px] w-[48px] h-[48px] ${backgroundColor}`}>
      {clonedIcon}
    </View>
  );
};

export default TopTabIcon;
