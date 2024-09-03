import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { Text, View, Image } from 'react-native';

import theme from '@/constants/Colors';
import { IconSize } from '@/util/IconSize';

interface TabIconProps {
  focused: boolean;
  name: string;
  children: ReactElement;
}

export const TabIcon: React.FC<TabIconProps> = ({ focused, name, children }) => {
  const { colorScheme } = useColorScheme();
  const clonedIcon = React.cloneElement(
    children,
    children.type === Image
      ? {
          style: {
            borderWidth: focused ? 2 : 0,
            borderColor: focused
              ? colorScheme === 'light'
                ? theme.primary.base
                : theme.primary.light
              : '',
            borderRadius: 12,
          },
          width: IconSize.SMALL,
          height: IconSize.SMALL,
        }
      : {
          width: IconSize.SMALL,
          height: IconSize.SMALL,
          stroke: focused
            ? colorScheme === 'light'
              ? theme.primary.base
              : theme.primary.light
            : theme.sky.dark,
        },
  );
  return (
    <View className="flex items-center justify-center">
      {clonedIcon}
      <Text
        className={
          focused
            ? 'text-tiny font-normal text-primary-base dark:text-primary-light'
            : 'text-tiny font-normal text-sky-dark'
        }>
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
