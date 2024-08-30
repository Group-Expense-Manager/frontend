import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'primary' | 'reversed';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  type = 'primary',
}) => {
  const backgroundColor = function (type: 'primary' | 'reversed', disabled?: boolean): string {
    if (disabled) {
      if (type === 'primary') return 'bg-sky-light';
      return 'bg-sky-lightest';
    }
    if (type === 'primary') return 'bg-primary-base';
    return 'bg-sky-lightest';
  };

  const borderColor = function (type: 'primary' | 'reversed', disabled?: boolean): string {
    if (disabled) {
      return 'border-sky-light';
    }
    return 'border-primary-base';
  };

  const textColor = function (type: 'primary' | 'reversed', disabled?: boolean): string {
    if (disabled) {
      if (type === 'primary') return 'text-sky-dark';
      return 'text-sky-light';
    }
    if (type === 'primary') return 'text-sky-lightest';
    return 'text-primary-base';
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`
          bg-primary-base border-primary-base border-2 rounded-[32px] h-[48px] w-full flex flex-row justify-center items-center 
          ${backgroundColor(type, disabled)}
          ${borderColor(type, disabled)}
        `}
        disabled={disabled}>
        <Text className={`${textColor(type, disabled)} font-semibold`}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
