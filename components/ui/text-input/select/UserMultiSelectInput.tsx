import { uuid } from 'expo-modules-core';
import React, { ReactNode, useContext, useLayoutEffect, useRef } from 'react';
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

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    setSelectInputProps({
      data,
      createRow,
      onSelect: onItemSelect,
      selectedData: values,
    });
    if (hasMounted.current) {
      onSelect(values);
    }

    hasMounted.current = true;
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
            <Loader size="small" />
          </View>
        )}
      </View>
      <ScrollView className="w-full">
        <View className="flex flex-row flex-wrap">
          {values.map((value) => (
            <View key={uuid.v4()} className="mx-0.5 my-1">
              <UserChip type={type} userDetails={value} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MultiSelectInput;
