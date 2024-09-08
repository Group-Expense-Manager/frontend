import { useNavigation } from 'expo-router';
import React, { ReactNode, useContext, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

const isSelect = (item: SelectInputData<any>, selectedData: SelectInputData<any>[]) => {
  return selectedData.some(
    (selectedItem) => selectedItem.name === item.name && selectedItem.value === item.value,
  );
};

const isLatestElement = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  return data.indexOf(item) === data.length - 1;
};

const getBorderStyles = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  if (isLatestElement(item, data)) return '';
  return 'border-sky-light border-b-2';
};

interface SelectListProps<T> {
  title: string;
  data: SelectInputData<T>[];
  createRow: (item: SelectInputData<T>, selected: boolean) => ReactNode;
}

const SelectList: React.FC<SelectListProps<any>> = ({ title, data, createRow }) => {
  const { selectInputProps, setSelectInputProps } = useContext(SelectInputContext);
  const navigation = useNavigation();

  const handleSelect = (item: SelectInputData<any>) => {
    selectInputProps.onSelect(item.value);
    setSelectInputProps({
      ...selectInputProps,
      selectedData: [item],
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={title} />,
    });
  }, [navigation, title]);

  return (
    <Box>
      <View className="py-[32px] w-full flex flex-col">
        {data.map((item) => (
          <View key={item.name} className={`${getBorderStyles(item, data)} flex justify-center`}>
            <TouchableOpacity
              className="flex my-2 h-16 justify-center"
              onPress={() => handleSelect(item)}>
              {createRow(item, isSelect(item, selectInputProps.selectedData))}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Box>
  );
};

export default SelectList;
