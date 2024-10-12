import { router } from 'expo-router';
import React, { ReactNode, useContext } from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native';

import Loader from '@/components/ui/loader/Loader';
import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import { IconSize } from '@/util/IconSize';

export interface SelectInputComponentProps<T> {
  onSelect?: (value: T) => void;
  onPress?: () => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  value?: T;
  showErrors?: boolean;
  data?: SelectInputData<T>[];
}

export const getDownArrowIcon = () => {
  return <ChevronDownIcon width={IconSize.TINY} height={IconSize.TINY} />;
};

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

const SelectInput: React.FC<SelectInputComponentProps<any>> = ({
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
    const selectedValue = data.find((item) => isEqual(item.value, value));
    return !!selectedValue && <Text className={getInputStyle(disabled)}>{selectedValue.name}</Text>;
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

  const showLoader = data.length === 0;

  return (
    <View className="relative">
      <BaseInput
        disabled={disabled || showLoader}
        label={label}
        errorMessages={errorMessages}
        linkLabel={linkLabel}
        handlePress={handlePress}
        middleSection={getValueLabel()}
        rightSection={getDownArrowIcon()}
        showErrors={showErrors}
      />
      {showLoader && (
        <View className="absolute flex w-full justify-center content-center h-full">
          <Loader size="small" />
        </View>
      )}
    </View>
  );
};

export default SelectInput;
