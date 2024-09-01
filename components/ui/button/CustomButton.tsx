import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Availability } from '@/util/Availability';
import { ButtonType } from '@/util/ButtonType';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
  BLOCK = 'BLOCK',
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  type = ButtonType.PRIMARY,
  size = ButtonSize.BLOCK,
}) => {
  const disabledType = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${type}`;

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

  function textColor(): string {
    switch (disabledType) {
      case `${Availability.DISABLED}-${ButtonType.PRIMARY}`:
        return 'text-sky-dark dark:text-ink-light';
      case `${Availability.DISABLED}-${ButtonType.OUTLINED}`:
        return 'text-sky-base dark:text-ink-base';
      case `${Availability.ENABLED}-${ButtonType.PRIMARY}`:
        return 'text-sky-lightest';
      case `${Availability.ENABLED}-${ButtonType.OUTLINED}`:
        return 'text-primary-base dark:text-primary-light';
      default:
        return '';
    }
  }
  return (
    <View className={`${size === ButtonSize.BLOCK ? 'w-full' : ''}`}>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
