import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const handleChangeText = (text: string) => {
  return text.trim();
};

interface EmailTextInputProps {
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  value?: string;
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  onBlur?: () => void;
  showErrors?: boolean;
}

const EmailTextInput: React.FC<EmailTextInputProps> = ({
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
      keyboardType="email-address"
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

export default EmailTextInput;
