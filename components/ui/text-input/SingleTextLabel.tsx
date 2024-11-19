import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Text, TextInput } from 'react-native';

import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

interface SingleTextLabelProps {
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  placeholder?: string;
  value?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  autoFocus?: boolean;
  onPress?: () => void;
  showErrors?: boolean;
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

const SingleTextLabel = forwardRef<any, SingleTextLabelProps>(
  (
    {
      disabled = false,
      errorMessages = [],
      linkLabel,
      value = '',
      label,
      placeholder = '',
      autoFocus = false,
      showErrors = false,
      onPress = () => {},
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      blur: () => {
        textInputRef.current?.blur();
        setIsFocused(false);
      },
      focus: () => {
        textInputRef.current?.focus();
        setIsFocused(true);
      },
    }));

    const handlePress = () => {
      if (!disabled) {
        onPress();
        setIsFocused(true);
        textInputRef.current?.focus();
      }
    };

    const getInputComponent = () => {
      return (
        (!!value || isFocused || autoFocus) && (
          <Text className={getInputStyle(disabled)}>{value ?? placeholder}</Text>
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
        showErrors={showErrors}
      />
    );
  },
);

export default SingleTextLabel;
