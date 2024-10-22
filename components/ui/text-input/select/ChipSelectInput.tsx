import { router } from 'expo-router';
import React, { ReactNode, useContext } from 'react';
import isEqual from 'react-fast-compare';

import Chip from '@/components/ui/chip/Chip';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

export interface ChipSelectInputComponentProps<T> {
  onSelect?: (value: T) => void;
  onPress?: () => void;
  value?: T;
  data?: SelectInputData<T>[];
}

const ChipSelectInput: React.FC<ChipSelectInputComponentProps<any>> = ({
  onSelect = () => {},
  onPress = () => {},
  value,
  data = [],
}) => {
  const getValueLabel = () => {
    const selectedValue = data.find((item) => isEqual(item.value, value));
    return selectedValue?.name ?? '';
  };
  const { setSelectInputProps } = useContext(SelectInputContext);

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

  return <Chip text={getValueLabel()} type="select" onPress={handlePress} />;
};

export default ChipSelectInput;
