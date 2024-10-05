import React, { ReactNode, useContext, useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';

import Chip from '@/components/ui/chip/Chip';
import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import CheckBoxRow from '@/components/ui/text-input/select/row/CheckBoxRow';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import { IconSize } from '@/util/IconSize';

interface MultiSelectInputProps<T> {
  onSelect?: (values: T[]) => void;
  onPress?: () => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  data?: SelectInputData<T>[];
  values?: SelectInputData<T>[];
  setValues?: React.Dispatch<React.SetStateAction<SelectInputData<T>[]>>;
  showErrors?: boolean;
  type?: 'remove' | 'normal';
}

const MultiSelectInput: React.FC<MultiSelectInputProps<any>> = ({
  onSelect = () => {},
  onPress = () => {},
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  data = [],
  values = [],
  setValues = () => {},
  showErrors = false,
  type = 'normal',
}) => {
  const { setSelectInputProps } = useContext(SelectInputContext);

  const getDownArrowIcon = () => {
    return <ChevronDownIcon width={IconSize.TINY} height={IconSize.TINY} />;
  };

  const handleMultiSelect = (item: SelectInputData<any>) => {
    setValues((prevValues) => {
      const isAlreadySelected = prevValues.some(
        (selectedItem) => selectedItem.name === item.name && selectedItem.value === item.value,
      );

      return isAlreadySelected
        ? prevValues.filter(
            (selectedItem) =>
              !(selectedItem.name === item.name && selectedItem.value === item.value),
          )
        : [...prevValues, item];
    });
  };

  const createRow = (item: SelectInputData<any>, selected: boolean): ReactNode => {
    return <CheckBoxRow item={item} selected={selected} />;
  };

  const handlePress = () => {
    setSelectInputProps({
      onSelect: handleMultiSelect,
      selectedData: values,
      data,
      createRow,
    });
    onPress();
  };

  useLayoutEffect(() => {
    setSelectInputProps({
      data,
      createRow,
      onSelect: handleMultiSelect,
      selectedData: values,
    });
    onSelect(values.map((value) => value.value));
  }, [values]);

  return (
    <View className="space-y-2">
      <BaseInput
        disabled={disabled}
        label={label}
        errorMessages={errorMessages}
        linkLabel={linkLabel}
        handlePress={handlePress}
        rightSection={getDownArrowIcon()}
        showErrors={showErrors}
      />
      <ScrollView horizontal className="flex-row space-x-2 w-full">
        {values.map((value) => (
          <View key={value.name}>
            <Chip text={value.name} type={type} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MultiSelectInput;
