import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '@/constants/Colors';
import { Availability } from '@/util/Availability';
import { ButtonType } from '@/util/ButtonType';

interface IconButtonProps {
  onPress: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  children: ReactElement;
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  disabled = false,
  type = ButtonType.PRIMARY,
  size = ButtonSize.LARGE,
  children,
}) => {
  const { colorScheme } = useColorScheme();
  const disabledType = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${type}`;

  const clonedIcon = React.cloneElement(children, {
    width: 24,
    height: 24,
    stroke: iconColor(),
  });

  function backgroundColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.PRIMARY}`:
        return 'bg-sky-light dark:bg-ink-dark';
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'bg-sky-latest dark:bg-ink-darkest';
      case `${Availability.ENABLED}-${ButtonType.PRIMARY}`:
        return 'bg-primary-base';
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`:
        return 'bg-sky-latest dark:bg-ink-darkest';
      default:
        return '';
    }
  }

  function borderColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'border-sky-base dark:border-ink-base';
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`:
        return 'border-primary-base dark:border-primary-light';
      default:
        return '';
    }
  }

  function iconColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.PRIMARY}`:
        return colorScheme === 'light' ? theme.sky.dark : theme.ink.light;
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return colorScheme === 'light' ? theme.sky.base : theme.ink.base;
      case `${Availability.ENABLED}-${ButtonType.PRIMARY}`:
        return theme.sky.lightest;
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`:
        return colorScheme === 'light' ? theme.primary.base : theme.primary.light;
      default:
        return '';
    }
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`
           ${type === ButtonType.OUTLINED ? 'border-2' : ''} 
           ${size === ButtonSize.LARGE ? 'h-12 w-12' : 'h-8 w-8'} 
           rounded-[32px] justify-center items-center 
          ${backgroundColor()}
          ${borderColor()}
        `}
      disabled={disabled}>
      {clonedIcon}
    </TouchableOpacity>
  );
};

export default IconButton;
