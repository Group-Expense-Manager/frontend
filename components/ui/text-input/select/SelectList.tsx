import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CustomHeader from '@/components/ui/header/CustomHeader';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

const isSelect = (item: SelectInputData<any>, selectedData: SelectInputData<any>[]) => {
  if (!selectedData) return false;
  return selectedData.includes(item);
};

const isLatestElement = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  return data.indexOf(item) === data.length - 1;
};

const getBorderStyles = (item: SelectInputData<any>, data: SelectInputData<any>[]) => {
  if (isLatestElement(item, data)) return '';
  return 'border-sky-light border-b-2';
};

const SelectList: React.FC = () => {
  const { selectInputProps, setSelectInputProps } = useContext(SelectInputContext);

  const handleSelect = (item: SelectInputData<any>) => {
    selectInputProps.onSelect(item.value);
    setSelectInputProps({
      ...selectInputProps,
      selectedData: [item],
    });
  };

  return (
    <SafeView>
      <View>
        <CustomHeader title={selectInputProps.title} />
        {selectInputProps.data.map((item) => (
          <View
            key={item.name}
            className={`${getBorderStyles(item, selectInputProps.data)} flex justify-center`}>
            <TouchableOpacity
              className="flex my-2 h-16 justify-center"
              onPress={() => handleSelect(item)}>
              {selectInputProps.createRow(item, isSelect(item, selectInputProps.selectedData))}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeView>
  );
};

export default SelectList;
