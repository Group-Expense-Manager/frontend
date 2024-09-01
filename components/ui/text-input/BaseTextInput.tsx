import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Keyboard } from 'react-native';

import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import theme from '@/constants/Colors';

interface BaseTextInputProps {
  valueType: 'text' | 'number' | 'password' | 'multiline' | 'email' | 'phone';
  disabled?: boolean;
  errorMessage?: string;
  linkLabel?: LinkLabelProps;
  startValue?: string;
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
}

const getInputKeyboardType = (valueType: string) => {
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

  return result;
};

const getInputStyle = (isDisabled: boolean) => {
  let inputStyle = 'text-regular font-bold';
  switch (true) {
    case isDisabled:
      inputStyle += ' text-sky-dark dark:text-ink-lightest';
      break;
    default:
      inputStyle += ' text-ink-darkest dark:text-sky-lightest';
      break;
  }
  return inputStyle;
};

const getPlaceholderColor = (colorScheme: string) => {
  return colorScheme === 'light' ? theme.ink.lighter : theme.sky.dark;
};

const BaseTextInput: React.FC<BaseTextInputProps> = ({
  valueType,
  disabled = false,
  errorMessage = '',
  linkLabel,
  startValue = '',
  label,
  placeholder = '',
  onChangeText = () => {},
}) => {
  const { colorScheme } = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  const [textInputValue, setTextInputValue] = useState(startValue);
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => !disabled && setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handlePress = () => {
    if (!disabled) {
      setIsFocused(true);
      textInputRef.current?.focus();
    }
  };

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

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (!textInputValue) setIsFocused(false);
    });
    return () => keyboardDidHideListener.remove();
  }, [textInputValue]);

  const getInputComponent = () => {
    return (
      (!!textInputValue || isFocused) && (
        <TextInput
          ref={textInputRef}
          placeholderTextColor={getPlaceholderColor(colorScheme)}
          placeholder={placeholder}
          value={textInputValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={getInputKeyboardType(valueType)}
          secureTextEntry={valueType === 'password'}
          editable={!disabled}
          className={getInputStyle(disabled)}
          autoFocus
        />
      )
    );
  };

  return (
    <BaseInput
      disabled={disabled}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      label={label}
      errorMessage={errorMessage}
      middleSection={getInputComponent()}
      linkLabel={linkLabel}
      handlePress={handlePress}
    />
  );
};

export default BaseTextInput;
