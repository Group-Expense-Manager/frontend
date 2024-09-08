import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import theme from '@/constants/Colors';
import { IconSize } from '@/util/IconSize';

export interface CreationButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon: ReactElement;
}

const CreationButton: React.FC<CreationButtonProps> = ({
  title,
  onPress,
  disabled = false,
  icon,
}) => {
  const { colorScheme } = useColorScheme();

  const clonedIcon = React.cloneElement(icon, {
    width: IconSize.COLOSSAL,
    height: IconSize.COLOSSAL,
    stroke: iconColor(),
  });

  function backgroundColor(): string {
    if (!disabled) {
      return 'bg-primary-base';
    }
    return 'bg-sky-light dark:bg-ink-dark';
  }

  function textColor(): string {
    if (!disabled) {
      return 'text-sky-lightest';
    }
    return 'text-sky-dark dark:text-ink-light';
  }

  function iconColor(): string {
    if (!disabled) {
      return theme.sky.lightest;
    }
    return colorScheme === 'light' ? theme.sky.dark : theme.ink.light;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`
           rounded-3xl  w-full justify-center items-center p-3
          ${backgroundColor()}
        `}
      disabled={disabled}>
      {clonedIcon}
      <Text className={`${textColor()} text-title3`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CreationButton;
