import { arrayOf } from 'prop-types';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CustomHeader from '@/components/ui/header/CustomHeader';
// import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';

const SelectMenuScreen = () => {
  const { selectInputProps, setSelectInputProps } = useContext(SelectInputContext);

  const handleSelect = (item: SelectInputData<any>) => {
    selectInputProps.onSelect(item.value);
    setSelectInputProps({
      ...selectInputProps,
      selectedData: [item],
    });
  };

  const isSelect = (item: SelectInputData<any>) => {
    if (!selectInputProps.selectedData) return false;
    return selectInputProps.selectedData.includes(item);
  };

  return (
    <SafeView>
      <View>
        <CustomHeader title={selectInputProps.title} />
        {/*{selectInputProps.data.map((item) => (*/}
        {/*  <View className="flex row-auto w-full justify-items-start" key={item.value}>*/}
        {/*    <Text className="text-regular text-ink-darkest dark:text-sky-lightest font-regular text-left">*/}
        {/*      {item.name}*/}
        {/*    </Text>*/}
        {/*    <CustomRadioButton value={isSelect(item)} onValueChange={() => handleSelect(item)} />*/}
        {/*  </View>*/}
        {/*))}*/}
      </View>
    </SafeView>
  );
};

export default SelectMenuScreen;
