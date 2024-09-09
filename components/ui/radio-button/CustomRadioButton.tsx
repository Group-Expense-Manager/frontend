import React from 'react';
import { View } from 'react-native';

interface CustomCheckboxProps {
  disabled?: boolean;
  value?: boolean;
  onValueChange?: () => void;
}

const CustomRadioButton: React.FC<CustomCheckboxProps> = ({ disabled = false, value = false }) => {
  const getInnerCircleClass = () => {
    switch (true) {
      case value && disabled:
        return 'bg-sky-lighter dark:bg-ink-dark';
      case value && !disabled:
        return 'bg-sky-lightest dark:bg-ink-darkest';
      default:
        return '';
    }
  };

  const getOuterCircleClass = () => {
    switch (true) {
      case value && !disabled:
        return 'bg-primary-base';
      case value && disabled:
        return 'bg-sky-lightest dark:bg-ink-darker';
      default:
        return '';
    }
  };

  const getBorderClass = () => {
    switch (true) {
      case !value && disabled:
        return 'border-2 border-sky-light dark:border-ink-darkest';
      case !value && !disabled:
        return 'border-2 border-sky-base dark:border-ink-light';
      default:
        return '';
    }
  };

  return (
    <View
      className={`w-6 h-6 items-center justify-center rounded-full ${getOuterCircleClass()} ${getBorderClass()}`}>
      {value && <View className={`w-2 h-2 rounded-full ${getInnerCircleClass()}`} />}
    </View>
  );
};

export default CustomRadioButton;
