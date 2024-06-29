import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@/constants/Colors';

interface CustomTextInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChangeText?: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value = '',
  label = '',
  placeholder = '',
  disabled = false,
  secureTextEntry = false,
  error = false,
  onChangeText = () => {},
}) => {
  return (
    <View className="w-full">
      <TextInput
        secureTextEntry={secureTextEntry}
        value={value}
        mode="outlined"
        label={label}
        disabled={disabled}
        placeholder={placeholder}
        error={error}
        outlineColor={theme.ink.base}
        activeOutlineColor={theme.primary.base}
        textColor={theme.ink.darkest}
        className="font-normal font-regular text-ink-darkest w-full bg-sky-lightest"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomTextInput;
