import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text } from 'react-native';

import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

interface SelectInputProps<T> {
  data: SelectInputData<T>[];
  onSelect: (value: T) => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  value?: SelectInputData<T>;
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

const SelectInput: React.FC<SelectInputProps<any>> = ({
  data = [],
  onSelect = () => {},
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  value,
  showErrors,
}) => {
  const { selectInputProps, setSelectInputProps } = useContext(SelectInputContext);
  const [isFocused, setIsFocused] = useState(false);

  const getValueLabel = () => {
    return !!value && <Text className={getInputStyle(disabled)}>{value.name}</Text>;
  };

  const handlePress = () => {
    setSelectInputProps({
      title: label,
      data,
      onSelect,
    });
    router.navigate('/(utils)/select-menu-list');
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
      middleSection={getValueLabel()}
      showErrors={showErrors}
    />
  );
};

export default SelectInput;
