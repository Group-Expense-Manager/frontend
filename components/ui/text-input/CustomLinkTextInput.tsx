import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@/constants/Colors';

interface CustomLinkTextInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChangeText?: (text: string) => void;
  linkLabel?: string;
  onPress?: () => void;
}

const CustomTextInput: React.FC<CustomLinkTextInputProps> = ({
  value,
  label = '',
  placeholder = '',
  disabled = false,
  secureTextEntry = false,
  error = false,
  onChangeText = () => {},
  linkLabel = '',
  onPress = () => {},
}) => {
  return (
    <View className="w-full gap-y-2.5">
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
      </View>
      <TouchableOpacity onPress={onPress} className="self-end">
        <Text className="text-primary-base font-light text-right text-decoration-line: underline">
          {linkLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
