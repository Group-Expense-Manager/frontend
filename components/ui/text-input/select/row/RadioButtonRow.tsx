import React from 'react';
import { Text, View } from 'react-native';

import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import { SelectInputData } from '@/context/utils/SelectInputContext';

interface RadioButtonRowProps<T> {
  item: SelectInputData<T>;
  selected: boolean;
}

const SelectInput: React.FC<RadioButtonRowProps<any>> = ({ item, selected }) => {
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

export default SelectInput;
