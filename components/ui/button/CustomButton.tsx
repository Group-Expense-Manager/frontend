import React from 'react';
import { Text, View } from 'react-native';

import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { Availability } from '@/util/Availability';
import { ButtonType } from '@/util/ButtonType';

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
  BLOCK = 'BLOCK',
}

export enum ButtonColor {
  PRIMARY = 'PRIMARY',
  RED = 'RED',
  GREEN = 'GREEN',
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  type = ButtonType.NORMAL,
  size = ButtonSize.BLOCK,
  color = ButtonColor.PRIMARY,
}) => {
  const disabledType = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${type}`;

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

  function textColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.NORMAL}`:
        return 'text-sky-dark dark:text-ink-light';
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'text-sky-base dark:text-ink-base';
      case `${Availability.ENABLED}-${ButtonType.NORMAL}`:
        return 'text-sky-lightest';
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`: {
        switch (color) {
          case ButtonColor.PRIMARY:
            return 'text-primary-base dark:text-primary-light';
          case ButtonColor.RED:
            return 'text-red-base dark:text-red-light';
          case ButtonColor.GREEN:
            return 'text-green-base dark:text-green-light';
        }
      }
      default:
        return '';
    }
  }

  return (
    <View className={`${size === ButtonSize.BLOCK ? 'w-full' : ''}`}>
      <SingleClickTouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`
           ${type === ButtonType.OUTLINED ? 'border' : ''} 
           ${size === ButtonSize.LARGE ? 'px-8 h-12' : size === ButtonSize.SMALL ? 'px-4 h-8' : 'h-12'} 
           rounded-[32px]  w-full justify-center items-center 
          ${backgroundColor()}
          ${borderColor()}
        `}
        disabled={disabled}>
        <Text className={`${textColor()} font-medium text-regular`}>{title}</Text>
      </SingleClickTouchableOpacity>
    </View>
  );
};

export default CustomButton;
