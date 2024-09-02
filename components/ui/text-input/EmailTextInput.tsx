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
  startValue?: string;
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
}

const EmailTextInput: React.FC<EmailTextInputProps> = ({
  disabled = false,
  errorMessages = [],
  linkLabel,
  startValue = '',
  label,
  placeholder = '',
  onChangeText = () => {},
}) => {
  return (
    <BaseTextInput
      keyboardType="email-address"
      processText={handleChangeText}
      secured={false}
      disabled={disabled}
      errorMessages={errorMessages}
      linkLabel={linkLabel}
      value={startValue}
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};

export default EmailTextInput;
