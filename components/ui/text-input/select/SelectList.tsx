import { useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import InnerSelectList from '@/components/ui/text-input/select/InnerSelectList';
import { SelectInputContext } from '@/context/utils/SelectInputContext';

interface SelectListProps {
  title: string;
}

const SelectList: React.FC<SelectListProps> = ({ title }) => {
  const navigation = useNavigation();
  const { selectInputProps } = useContext(SelectInputContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={title} />,
    });
  }, [navigation, title]);

  return (
    <Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerSelectList selectInputProps={selectInputProps} />
      </ScrollView>
    </Box>
  );
};

export default SelectList;
