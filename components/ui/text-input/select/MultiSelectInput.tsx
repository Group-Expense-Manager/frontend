import { uuid } from 'expo-modules-core';
import React, { ReactNode, useContext, useLayoutEffect } from 'react';
import isEqual from 'react-fast-compare';
import { ScrollView, View } from 'react-native';

import Chip from '@/components/ui/chip/Chip';
import Loader from '@/components/ui/loader/Loader';
import BaseInput from '@/components/ui/text-input/BaseInput';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import { getDownArrowIcon } from '@/components/ui/text-input/select/SelectInput';
import CheckBoxRow from '@/components/ui/text-input/select/row/CheckBoxRow';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

export interface MultiSelectInputComponentProps<T> {
  onSelect?: (values: T[]) => void;
  onPress?: () => void;
  disabled?: boolean;
  errorMessages?: string[];
  linkLabel?: LinkLabelProps;
  label: string;
  data?: SelectInputData<T>[];
  values?: T[];
  setValues?: React.Dispatch<React.SetStateAction<T[]>>;
  showErrors?: boolean;
  type?: 'remove' | 'normal';
}

export const handleMultiSelect = (
  item: any,
  setValues: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setValues((prevValues) => {
    const isAlreadySelected = prevValues.some((selectedItem) => isEqual(selectedItem, item));

    return isAlreadySelected
      ? prevValues.filter((selectedItem) => !isEqual(selectedItem, item))
      : [...prevValues, item];
  });
};

const MultiSelectInput: React.FC<MultiSelectInputComponentProps<any>> = ({
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

  const onItemSelect = (item: SelectInputData<any>) => {
    handleMultiSelect(item.value, setValues);
  };

  const createRow = (item: SelectInputData<any>, selected: boolean): ReactNode => {
    return <CheckBoxRow item={item} selected={selected} />;
  };

  const handlePress = () => {
    setSelectInputProps({
      onSelect: onItemSelect,
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
      onSelect: onItemSelect,
      selectedData: values,
    });
    onSelect(values);
  }, [values]);

  const selectedValues =
    values.map((value) => data.find((item) => isEqual(item.value, value))) ?? [];

  const showLoader = data.length === 0;

  return (
    <View className="space-y-2">
      <View className="relative">
        <BaseInput
          disabled={disabled || showLoader}
          label={label}
          errorMessages={errorMessages}
          linkLabel={linkLabel}
          handlePress={handlePress}
          rightSection={getDownArrowIcon()}
          showErrors={showErrors}
        />
        {showLoader && (
          <View className="absolute flex w-full justify-center content-center h-full">
            <Loader />
          </View>
        )}
      </View>
      <ScrollView className="w-full">
        <View className="flex flex-row flex-wrap">
          {selectedValues.map((value) => (
            <View key={uuid.v4()} className="m-1">
              <Chip text={value?.name ?? ''} type={type} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MultiSelectInput;
