import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const handleChangeText = (text: string) => {
  return text.replace(/\s+/g, ' ').trimStart();
};

interface MultiTextInputProps {
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  value?: string;
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
}

const MultiTextInput: React.FC<MultiTextInputProps> = ({
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
      keyboardType="default"
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

export default MultiTextInput;
