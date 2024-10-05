import React from 'react';
import { Text, View } from 'react-native';

import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import { SelectInputData } from '@/context/utils/SelectInputContext';

interface RadioButtonRowProps<T> {
  item: SelectInputData<T>;
  selected: boolean;
}

const CheckBoxRow: React.FC<RadioButtonRowProps<any>> = ({ item, selected }) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-regular text-ink-darkest dark:text-sky-lightest font-regular text-left">
        {item.name}
      </Text>
      <View className="items-center justify-center">
        <CustomCheckbox value={selected} disabled={item.isDisabled} />
      </View>
    </View>
  );
};

export default CheckBoxRow;
