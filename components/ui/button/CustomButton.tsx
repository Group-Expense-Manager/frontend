import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'primary' | 'outlined';
  size?: 'block' | 'small' | 'large';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  type = 'primary',
  size = 'block',
}) => {
  const { colorScheme } = useColorScheme();
  const [pressed, setPressed] = useState(false);
  const state: 'default' | 'pressed' | 'disabled' = disabled
    ? 'disabled'
    : pressed
      ? 'pressed'
      : 'default';

  function backgroundColor(): string {
    switch (type) {
      case 'primary':
        switch (state) {
          case 'pressed':
            return 'bg-primary-dark';
          case 'disabled':
            return colorScheme === 'light' ? 'bg-sky-light' : 'bg-ink-dark';
          default:
            return 'bg-primary-base';
        }
      case 'outlined':
        return colorScheme === 'light' ? 'bg-sky-latest' : 'bg-ink-darkest';
    }
  }

  function borderColor(): string {
    switch (type) {
      case 'primary':
        return '';
      case 'outlined':
        switch (state) {
          case 'pressed':
            return colorScheme === 'light' ? 'border-primary-dark' : 'border-primary-base';
          case 'disabled':
            return colorScheme === 'light' ? 'border-sky-base' : 'border-ink-base';
          default:
            return colorScheme === 'light' ? 'border-primary-base' : 'border-primary-light';
        }
    }
  }

  function textColor(): string {
    switch (type) {
      case 'primary':
        switch (state) {
          case 'disabled':
            return colorScheme === 'light' ? 'text-sky-dark' : 'text-ink-light';
          default:
            return 'text-sky-lightest';
        }
      case 'outlined':
        switch (state) {
          case 'pressed':
            return colorScheme === 'light' ? 'text-primary-dark' : 'text-primary-base';
          case 'disabled':
            return colorScheme === 'light' ? 'text-sky-base' : 'text-ink-base';
          default:
            return colorScheme === 'light' ? 'text-primary-base' : 'text-primary-light';
        }
    }
  }
  return (
    <View className={`${size === 'block' ? 'w-full' : ''}`}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        activeOpacity={0.7}
        className={`
           ${type === 'outlined' ? 'border-2' : ''} 
           ${size === 'large' ? 'px-8 h-12' : size === 'small' ? 'px-4 h-8' : 'h-12'} 
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
