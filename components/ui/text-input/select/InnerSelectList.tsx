import { uuid } from 'expo-modules-core';
import React from 'react';
import isEqual from 'react-fast-compare';
import { TouchableOpacity, View } from 'react-native';

import { SelectInputData, SelectInputProps } from '@/context/utils/SelectInputContext';

const isSelect = (item: SelectInputData<any>, selectedData: any[]) => {
  return selectedData.some((selectedItem) => isEqual(selectedItem, item.value));
};

const isLatestElement = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  return data.indexOf(item) === data.length - 1;
};

const getBorderStyles = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  if (isLatestElement(item, data)) return '';
  return 'border-sky-light border-b-2';
};

interface InnerSelectListProps<T> {
  type?: 'select' | 'filter';
  selectInputProps: SelectInputProps<T>;
}

const InnerSelectList: React.FC<InnerSelectListProps<any>> = ({
  type = 'select',
  selectInputProps,
}) => {
  const handleSelect = (item: SelectInputData<any>) => {
    selectInputProps.onSelect(item);
  };

  const getRowStyling = () => {
    return type === 'select' ? 'my-2' : 'ml-2 mr-3 my-1';
  };

  return (
    <View className="flex flex-col w-full flex-wrap">
      {selectInputProps.data.map((item) => (
        <View
          key={uuid.v4()}
          className={`${getBorderStyles(item, selectInputProps.data)} flex justify-center w-full`}>
          <TouchableOpacity
            disabled={item.isDisabled}
            className={`flex h-16 justify-center ${getRowStyling()}`}
            onPress={() => handleSelect(item)}>
            {selectInputProps.createRow(item, isSelect(item, selectInputProps.selectedData))}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default InnerSelectList;
