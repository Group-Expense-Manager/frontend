import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import InnerSelectList from '@/components/ui/text-input/select/InnerSelectList';
import { ChevronDownIcon, ChevronRight } from '@/constants/Icon';
import { SelectInputProps } from '@/context/utils/SelectInputContext';
import { IconSize } from '@/util/IconSize';

interface CategoryProps<T> {
  title: string;
  selectInputProps: SelectInputProps<T>;
}

const ExpandableSelectList: React.FC<CategoryProps<any>> = ({ title, selectInputProps }) => {
  const [expanded, setExpanded] = useState(false);
  const { colorScheme } = useColorScheme();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getIcon = () => {
    return expanded ? (
      <ChevronDownIcon
        width={IconSize.MEDIUM}
        height={IconSize.MEDIUM}
        strokeWidth={1}
        stroke={colorScheme === 'dark' ? 'white' : 'black'}
      />
    ) : (
      <ChevronRight
        width={IconSize.MEDIUM}
        height={IconSize.MEDIUM}
        stroke={colorScheme === 'dark' ? 'white' : 'black'}
      />
    );
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={toggleExpand}
        className="py-2 flex-row items-center justify-between">
        <Text className="text-title3 font-bold text-ink-darkest dark:text-sky-lightest">
          {title}
        </Text>
        <View className="pr-0.5">{getIcon()}</View>
      </TouchableOpacity>
      {expanded && <InnerSelectList type="filter" selectInputProps={selectInputProps} />}
    </View>
  );
};
export default ExpandableSelectList;
