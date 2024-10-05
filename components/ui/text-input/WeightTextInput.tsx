import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const handleChangeText = (text: string) => {
  const cleanedText = text.replace(/[^0-9]/g, '');
  let number = cleanedText ? parseInt(cleanedText, 10) : 0;

  if (number > 100) {
    number = Number(number.toString().slice(0, -1));
  }
  return number.toString();
};

interface WeightTextInputProps {
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  value?: string;
  label: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  onBlur?: () => void;
  showErrors?: boolean;
}

const WeightTextInput: React.FC<WeightTextInputProps> = ({
  disabled = false,
  errorMessages = [],
  linkLabel,
  value = '',
  label,
  placeholder = '',
  onChangeText = () => {},
  autoFocus = false,
  onBlur = () => {},
  showErrors = false,
}) => {
  return (
    <BaseTextInput
      keyboardType="numeric"
      processText={handleChangeText}
      secured={false}
      disabled={disabled}
      errorMessages={errorMessages}
      linkLabel={linkLabel}
      value={value}
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoFocus={autoFocus}
      onBlur={onBlur}
      showErrors={showErrors}
    />
  );
};

export default WeightTextInput;
