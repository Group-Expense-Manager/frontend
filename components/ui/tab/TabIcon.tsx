import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import theme from '@/constants/Colors';
import { IconSize } from '@/util/IconSize';

interface TabIconProps {
  focused: boolean;
  name: string;
  children: ReactElement;
}

export const TabIcon: React.FC<TabIconProps> = ({ focused, name, children }) => {
  const clonedIcon = React.cloneElement(children, {
    width: IconSize.MEDIUM,
    height: IconSize.MEDIUM,
    stroke: focused ? theme.primary.base : theme.sky.dark,
  });
  return (
    <View className="flex items-center justify-center">
      {clonedIcon}
      <Text
        className={
          focused
            ? 'text-tiny font-normal text-primary-base'
            : 'text-tiny font-normal text-sky-dark'
        }>
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
