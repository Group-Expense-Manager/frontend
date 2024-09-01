import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

interface CustomTextInputProps2 {
  valueType: 'text' | 'number' | 'password' | 'multiline' | 'email' | 'phone';
  disabled: boolean;
  errorMessage: string;
  linkLabel?: LinkLabelProps;
  value: string;
  label: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const getBorderStyle = (errorMessage: string, isFocused: boolean) => {
  let borderStyle = 'h-14 flex justify-center w-full rounded-lg dark:bg-ink-dark';
  switch (true) {
    case !!errorMessage:
      borderStyle += ' border-red-base border-2 dark:border-red-dark';
      break;
    case isFocused:
      borderStyle += ' border-primary-base border-2';
      break;
    default:
      borderStyle += ' border-sky-base border dark:border-ink-dark';
      break;
  }
  return borderStyle;
};

const LinkLabel: React.FC<LinkLabelProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1 justify-center">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-primary-base font-light text-small text-right text-decoration-line: underline">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ErrorLabel: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      className="flex-1 text-red-base text-small font-light text-left">
      {errorMessage}
    </Text>
  );
};

const foldStringUntil11Digits = (input: string): string => {
  let digitCount = 0;
  let result = '';

  for (const char of input) {
    if (/\d/.test(char)) {
      digitCount++;
    }
    result += char;
    if (digitCount >= 11) {
      break;
    }
  }

  console.log(result);
  return result;
};

const BaseTextInput: React.FC<CustomTextInputProps2> = ({
  valueType = 'number',
  disabled = false,
  errorMessage = '',
  linkLabel = undefined,
  value = '',
  label = '',
  placeholder = '',
  onChangeText,
  leftSection,
  rightSection,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textInputValue, setTextInputValue] = useState(value);

  const handleFocus = () => !disabled && setIsFocused(true);
  const handleBlur = () => !textInputValue && setIsFocused(false);

  const handleChangeText = (text: string) => {
    let processedText: string;

    switch (valueType) {
      case 'multiline':
        processedText = text.replace(/\s+/g, ' ').trimStart();
        break;
      case 'number':
        processedText = text.replace(/[^0-9.,]/g, '');
        break;
      case 'phone': {
        const cleanedText = text
          .trimStart()
          .replace(/\s+/g, ' ')
          .replace(/[^0-9 +]/g, '');
        processedText = foldStringUntil11Digits(cleanedText);
        break;
      }
      default:
        processedText = text.trim();
        break;
    }
    setTextInputValue(processedText);
    onChangeText?.(processedText);
  };

  const handlePress = () => !disabled && setIsFocused(true);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (!textInputValue) setIsFocused(false);
    });
    return () => keyboardDidHideListener.remove();
  }, [textInputValue]);

  const getLabelFontSize = () => {
    return isFocused || !!textInputValue ? 'text-tiny' : 'text-regular';
  };

  const getInputKeyboardType = () => {
    switch (valueType) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  return (
    <View className={`p-4 w-full h-24 ${disabled ? 'opacity-50' : ''}`}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View className={getBorderStyle(errorMessage, isFocused)}>
          {!leftSection && (
            <View className="flex p-2 items-center justify-center">{leftSection}</View>
          )}
          <View className="p-2">
            <Text className={`text-left ${getLabelFontSize()} font-regular`}>{label}</Text>
            {(!!textInputValue || isFocused) && (
              <TextInput
                placeholder={placeholder}
                value={textInputValue}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType={getInputKeyboardType()}
                secureTextEntry={valueType === 'password'}
                editable={!disabled}
                className="text-regular font-bold"
                autoFocus
              />
            )}
          </View>
          {!rightSection && (
            <View className="flex p-2 items-center justify-center">{rightSection}</View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View className="flex justify-between items-center flex-row p-2">
        {!!errorMessage && <ErrorLabel errorMessage={errorMessage} />}
        {!!linkLabel && <LinkLabel label={linkLabel.label} onPress={linkLabel.onPress} />}
      </View>
    </View>
  );
};

export default BaseTextInput;
