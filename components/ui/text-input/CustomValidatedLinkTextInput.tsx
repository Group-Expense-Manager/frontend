import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@/constants/Colors';

interface CustomTextInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  linkLabel: string;
  onPress: () => void;
  error: boolean;
  errorText: string;
}

const CustomValidatedLinkTextInput: React.FC<CustomTextInputProps> = ({
  value,
  label = '',
  placeholder = '',
  disabled = false,
  secureTextEntry = false,
  onChangeText = () => {},
  linkLabel,
  onPress,
  error,
  errorText,
}) => {
  return (
    <View className="w-full">
      <View>
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
        {error && (
          <View className="w-full absolute top-full">
            <Text className="text-red-lighter">{errorText}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onPress} className="self-end">
        <Text className="text-primary-base font-light text-right text-decoration-line: underline">
          {linkLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomValidatedLinkTextInput;
