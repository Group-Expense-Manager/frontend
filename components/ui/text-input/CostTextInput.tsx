import React from 'react';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const handleChangeText = (text: string) => {
  return text
    .replace(/[^0-9.,]/g, '') // allow only digits and ",."
    .replace(/\./g, ',') // change "." to ","
    .replace(/^,/g, '0,') // when first is "." change it to "0."
    .replace(/^0(?!$)([0-9])/g, '$1') // when first is "0" and then digit remove 0
    .replace(/(,.*),/g, '$1') // allow only one ","
    .replace(/^(\d{0,6})(,\d{0,2})?.*$/, '$1$2'); // allow max 6 digits before and 2 after ","
};

interface CostTextInputProps {
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

const CostTextInput: React.FC<CostTextInputProps> = ({
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

export default CostTextInput;
