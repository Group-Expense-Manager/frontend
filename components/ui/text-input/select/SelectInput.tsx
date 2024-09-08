import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import { IconSize } from '@/util/IconSize';

interface SelectInputProps<T> {
  onSelect: (value: T) => void;
  onPress: () => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  value?: SelectInputData<T>;
  showErrors?: boolean;
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
}) => {
  const { setSelectInputProps } = useContext(SelectInputContext);
  const [isFocused, setIsFocused] = useState(false);

  const getValueLabel = () => {
    return !!value && <Text className={getInputStyle(disabled)}>{value.name}</Text>;
  };

  const getDownArrowIcon = () => {
    return <ChevronDownIcon width={IconSize.TINY} height={IconSize.TINY} />;
  };

  const constructRow = <T,>(item: SelectInputData<T>, selected: boolean) => {
    return (
      <View className="flex-row items-center justify-between">
        <Text className="text-regular text-ink-darkest dark:text-sky-lightest font-regular text-left">
          {item.name}
        </Text>
        <View className="ml-2 items-center justify-center">
          <CustomRadioButton value={selected} />
        </View>
      </View>
    );
  };

  const handleSelect = (item: any) => {
    onSelect(item);
    router.back();
    setIsFocused(false);
  };

  const handlePress = () => {
    setSelectInputProps({
      onSelect: handleSelect,
      selectedData: value ? [value] : [],
    });
    onPress();
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
      rightSection={getDownArrowIcon()}
      showErrors={showErrors}
    />
  );
};

export default SelectInput;
