import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Keyboard } from 'react-native';

import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import theme from '@/constants/Colors';

interface BaseTextInputProps {
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  processText?: (text: string) => string;
  secured?: boolean;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  autoFocus: boolean;
  onBlur: () => void;
  showErrors: boolean;
}

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

const getSelectedColor = (isError: boolean) => {
  switch (true) {
    case isError:
      return theme.red.base;
    default:
      return theme.primary.base;
  }
};

const BaseTextInput: React.FC<BaseTextInputProps> = ({
  keyboardType = 'default',
  processText = (text) => text,
  secured = false,
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  placeholder = '',
  value = '',
  onChangeText = () => {},
  leftSection,
  rightSection,
  autoFocus,
  onBlur,
  showErrors,
}) => {
  const { colorScheme } = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => !disabled && setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  const handlePress = () => {
    if (!disabled) {
      setIsFocused(true);
      textInputRef.current?.focus();
    }
  };

  const handleChangeText = (text: string) => {
    const processedText = processText(text);
    onChangeText?.(processedText);
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsFocused(false);
      onBlur();
    });
    return () => keyboardDidHideListener.remove();
  }, [value]);

  const getInputComponent = () => {
    return (
      (!!value || isFocused) && (
        <TextInput
          ref={textInputRef}
          placeholderTextColor={getPlaceholderColor(colorScheme)}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPress={handlePress}
          keyboardType={keyboardType}
          secureTextEntry={secured}
          editable={!disabled}
          className={getInputStyle(disabled)}
          cursorColor={getSelectedColor(!!errorMessages.length || showErrors)}
          selectionColor={getSelectedColor(!!errorMessages.length || showErrors)}
          autoFocus={autoFocus || isFocused}
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
      errorMessages={errorMessages}
      linkLabel={linkLabel}
      handlePress={handlePress}
      middleSection={getInputComponent()}
      leftSection={leftSection}
      rightSection={rightSection}
      showErrors={showErrors}
    />
  );
};

export default BaseTextInput;
