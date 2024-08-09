import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@/constants/Colors';
import { Validator } from '@/util/Validator';

interface CustomTextInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  validator: Validator;
}

const CustomValidatedTextInput: React.FC<CustomTextInputProps> = ({
  value,
  label = '',
  placeholder = '',
  disabled = false,
  secureTextEntry = false,
  onChangeText = () => {},
  validator,
}) => {
  const errorStrings = validator.validate(value);
  const error = errorStrings?.length !== 0 && value !== '';
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
      </View>
      {error && (
        <View className="w-full absolute top-full">
          {errorStrings.map((item) => (
            <Text key={item} className="text-red-lighter">
              {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomValidatedTextInput;
