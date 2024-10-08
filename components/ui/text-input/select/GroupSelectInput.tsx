import { router } from 'expo-router';
import React, { ReactNode, useContext } from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import BaseInput from '@/components/ui/text-input/BaseInput';
import { SelectInputComponentProps } from '@/components/ui/text-input/select/SelectInput';
import GroupImageRow from '@/components/ui/text-input/select/row/GroupImageRow';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import { Group } from '@/hooks/group/UseGroups';
import { IconSize } from '@/util/IconSize';

const getInputStyle = (isDisabled: boolean) => {
  let inputStyle = 'text-regular font-bold';
  switch (true) {
    case isDisabled:
      inputStyle += ' text-sky-dark dark:text-ink-lightest';
      break;
    default:
      inputStyle += ' text-ink-darkest dark:text-sky-lightest';
      break;
  }
  return inputStyle;
};

const GroupSelectInput: React.FC<SelectInputComponentProps<Group>> = ({
  onSelect = () => {},
  onPress = () => {},
  disabled = false,
  errorMessages = [],
  linkLabel,
  label,
  value,
  showErrors = false,
  data = [],
}) => {
  const { setSelectInputProps } = useContext(SelectInputContext);

  const getValueLabel = () => {
    const selectedValue = data.find((item) => isEqual(item.value, value));
    return !!selectedValue && <Text className={getInputStyle(disabled)}>{selectedValue.name}</Text>;
  };

  const getDownArrowIcon = () => {
    return <ChevronDownIcon width={IconSize.SMALL} height={IconSize.SMALL} />;
  };

  const handleSelect = (item: SelectInputData<Group>) => {
    onSelect(item.value);
    router.back();
  };

  const createRow = (item: SelectInputData<Group>, selected: boolean): ReactNode => {
    return <GroupImageRow item={item} selected={selected} />;
  };

  const handlePress = () => {
    setSelectInputProps({
      createRow,
      data,
      onSelect: handleSelect,
      selectedData: value ? [value] : [],
    });
    onPress();
  };

  const showLoader = data.length === 0;

  const { data: profilePicture } = useGroupPicture(value?.groupId!, value?.attachmentId);

  const selectedAvatar = () => {
    return <CustomImage image={profilePicture} size="small" />;
  };

  return (
    <View className="relative">
      <BaseInput
        disabled={disabled || showLoader}
        label={label}
        errorMessages={errorMessages}
        linkLabel={linkLabel}
        handlePress={handlePress}
        middleSection={getValueLabel()}
        rightSection={getDownArrowIcon()}
        leftSection={selectedAvatar()}
        showErrors={showErrors}
      />
      {showLoader && (
        <View className="absolute flex w-full justify-center content-center h-full">
          <Loader />
        </View>
      )}
    </View>
  );
};

export default GroupSelectInput;
