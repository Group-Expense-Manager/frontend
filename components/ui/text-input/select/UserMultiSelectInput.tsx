import { uuid } from 'expo-modules-core';
import React, { ReactNode, useContext, useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';

import UserChip from '@/components/ui/chip/UserChip';
import Loader from '@/components/ui/loader/Loader';
import BaseInput from '@/components/ui/text-input/BaseInput';
import {
  handleMultiSelect,
  MultiSelectInputComponentProps,
} from '@/components/ui/text-input/select/MultiSelectInput';
import { getDownArrowIcon } from '@/components/ui/text-input/select/SelectInput';
import MultiUserImageRow from '@/components/ui/text-input/select/row/MultiUserImageRow';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';

const MultiSelectInput: React.FC<MultiSelectInputComponentProps<GroupMemberDetails>> = ({
  onSelect = () => {},
  onPress = () => {},
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  data = [],
  values = [],
  setValues = () => {},
  showErrors = false,
  type = 'normal',
}) => {
  const { setSelectInputProps } = useContext(SelectInputContext);

  const onItemSelect = (item: SelectInputData<any>) => {
    handleMultiSelect(item.value, setValues);
  };

  const createRow = (item: SelectInputData<GroupMemberDetails>, selected: boolean): ReactNode => {
    return <MultiUserImageRow item={item} selected={selected} />;
  };

  const handlePress = () => {
    setSelectInputProps({
      onSelect: onItemSelect,
      selectedData: values,
      data,
      createRow,
    });
    onPress();
  };

  useLayoutEffect(() => {
    setSelectInputProps({
      data,
      createRow,
      onSelect: onItemSelect,
      selectedData: values,
    });
    onSelect(values);
  }, [values]);

  const showLoader = data.length === 0;

  return (
    <View className="space-y-2">
      <View className="relative">
        <BaseInput
          disabled={disabled || showLoader}
          label={label}
          errorMessages={errorMessages}
          linkLabel={linkLabel}
          handlePress={handlePress}
          rightSection={getDownArrowIcon()}
          showErrors={showErrors}
        />
        {showLoader && (
          <View className="absolute flex w-full justify-center content-center h-full">
            <Loader />
          </View>
        )}
      </View>
      <ScrollView horizontal className="flex-row space-x-2 w-full">
        {values.map((value) => (
          <View key={uuid.v4()}>
            <UserChip type={type} userDetails={value} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MultiSelectInput;
