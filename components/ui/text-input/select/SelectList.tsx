import { uuid } from 'expo-modules-core';
import { useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect } from 'react';
import isEqual from 'react-fast-compare';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

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

interface SelectListProps {
  title: string;
}

const SelectList: React.FC<SelectListProps> = ({ title }) => {
  const { selectInputProps } = useContext(SelectInputContext);
  const navigation = useNavigation();

  const handleSelect = (item: SelectInputData<any>) => {
    selectInputProps.onSelect(item);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={title} />,
    });
  }, [navigation, title]);

  return (
    <Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col w-full flex-wrap">
          {selectInputProps.data.map((item) => (
            <View
              key={uuid.v4()}
              className={`${getBorderStyles(item, selectInputProps.data)} flex justify-center w-full`}>
              <TouchableOpacity
                disabled={item.isDisabled}
                className="flex my-2 h-16 justify-center"
                onPress={() => handleSelect(item)}>
                {selectInputProps.createRow(item, isSelect(item, selectInputProps.selectedData))}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </Box>
  );
};

export default SelectList;
