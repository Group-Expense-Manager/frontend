import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const handleChangeText = (text: string) => {
  return text.replace(/[^0-9.,]/g, '');
};

interface NumericTextInputProps {
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  value?: string;
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
}

const NumericTextInput: React.FC<NumericTextInputProps> = ({
  disabled = false,
  errorMessages = [],
  linkLabel,
  value = '',
  label,
  placeholder = '',
  onChangeText = () => {},
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
    />
  );
};

export default NumericTextInput;
