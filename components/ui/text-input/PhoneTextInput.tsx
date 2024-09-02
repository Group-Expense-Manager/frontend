import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

interface PhoneTextInputProps {
  startValue: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  linkLabel?: LinkLabelProps;
}

const PhoneTextInput: React.FC<PhoneTextInputProps> = ({
  disabled = false,
  errorMessage = '',
  linkLabel = undefined,
  startValue = '',
  onChangeText,
}) => {
  const { t } = useTranslation();
  return (
    <BaseTextInput
      valueType="phone"
      disabled={disabled}
      errorMessage={errorMessage}
      startValue={startValue}
      label={t('Mobile number')}
      placeholder={t('Enter mobile number')}
      onChangeText={onChangeText}
      linkLabel={linkLabel}
    />
  );
};

export default PhoneTextInput;
