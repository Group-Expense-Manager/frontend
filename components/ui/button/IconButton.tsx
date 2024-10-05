import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonColor } from '@/components/ui/button/CustomButton';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import theme from '@/constants/Colors';
import { Availability } from '@/util/Availability';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

interface IconButtonProps {
  onPress: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
  icon: ReactElement;
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  disabled = false,
  type = ButtonType.NORMAL,
  size = ButtonSize.LARGE,
  color = ButtonColor.PRIMARY,
  icon,
}) => {
  const { colorScheme } = useColorScheme();
  const disabledType = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${type}`;

  const clonedIcon = React.cloneElement(icon, {
    width: IconSize.SMALL,
    height: IconSize.SMALL,
    stroke: iconColor(),
  });

  function backgroundColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.NORMAL}`:
        return 'bg-sky-light dark:bg-ink-dark';
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'bg-sky-latest dark:bg-ink-darkest';
      case `${Availability.ENABLED}-${ButtonType.NORMAL}`: {
        switch (color) {
          case ButtonColor.PRIMARY:
            return 'bg-primary-base';
          case ButtonColor.RED:
            return 'bg-red-base';
          case ButtonColor.GREEN:
            return 'bg-green-base';
        }
      }
      default:
        return '';
    }
  }

  function borderColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'border-sky-base dark:border-ink-base';
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`: {
        switch (color) {
          case ButtonColor.PRIMARY:
            return 'border-primary-base dark:border-primary-light';
          case ButtonColor.RED:
            return 'border-red-base dark:border-red-light';
          case ButtonColor.GREEN:
            return 'border-green-base dark:border-green-light';
        }
      }
      default:
        return '';
    }
  }

  function iconColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.NORMAL}`:
        return colorScheme === 'light' ? theme.sky.dark : theme.ink.light;
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return colorScheme === 'light' ? theme.sky.base : theme.ink.base;
      case `${Availability.ENABLED}-${ButtonType.NORMAL}`:
        return theme.sky.lightest;
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`: {
        switch (color) {
          case ButtonColor.PRIMARY:
            return colorScheme === 'light' ? theme.primary.base : theme.primary.light;
          case ButtonColor.RED:
            return colorScheme === 'light' ? theme.red.base : theme.red.light;
          case ButtonColor.GREEN:
            return colorScheme === 'light' ? theme.green.base : theme.green.light;
        }
      }
      default:
        return '';
    }
  }
  return (
    <SingleClickTouchableOpacity
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
    </SingleClickTouchableOpacity>
  );
};

export default IconButton;
