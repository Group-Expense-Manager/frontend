import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

interface DefaultTextInputProps {
  value: string;
  label: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  disabled: boolean;
  errorMessage: string;
  linkLabel?: LinkLabelProps;
}

const DefaultTextInput: React.FC<DefaultTextInputProps> = ({
  disabled = false,
  errorMessage = '',
  linkLabel = undefined,
  value = '',
  label = '',
  placeholder = '',
  onChangeText,
}) => {
  return (
    <BaseTextInput
      valueType="text"
      disabled={disabled}
      errorMessage={errorMessage}
      value={value}
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
      linkLabel={linkLabel}
    />
  );
};

export default DefaultTextInput;
