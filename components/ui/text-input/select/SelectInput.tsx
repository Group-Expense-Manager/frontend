import { router } from 'expo-router';
import React, { ReactNode, useContext } from 'react';
import { Text } from 'react-native';

import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import { IconSize } from '@/util/IconSize';

interface SelectInputProps<T> {
  onSelect?: (value: T) => void;
  onPress?: () => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  value?: SelectInputData<T>;
  showErrors?: boolean;
  data?: SelectInputData<T>[];
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
  onSelect = () => {},
  onPress = () => {},
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  value,
  showErrors = false,
  data = [],
}) => {
  const { setSelectInputProps } = useContext(SelectInputContext);

  const getValueLabel = () => {
    return !!value && <Text className={getInputStyle(disabled)}>{value.name}</Text>;
  };

  const getDownArrowIcon = () => {
    return <ChevronDownIcon width={IconSize.TINY} height={IconSize.TINY} />;
  };

  const handleSelect = (item: SelectInputData<any>) => {
    onSelect(item.value);
    router.back();
  };

  const createRow = (item: SelectInputData<any>, selected: boolean): ReactNode => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const handlePress = () => {
    setSelectInputProps({
      createRow,
      data,
      onSelect: handleSelect,
      selectedData: value ? [value] : [],
    });
    onPress();
  };

  return (
    <BaseInput
      disabled={disabled}
      label={label}
      errorMessages={errorMessages}
      linkLabel={linkLabel}
      handlePress={handlePress}
      middleSection={getValueLabel()}
      rightSection={getDownArrowIcon()}
      showErrors={showErrors}
    />
  );
};

export default SelectInput;
