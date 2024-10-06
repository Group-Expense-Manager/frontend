import { router } from 'expo-router';
import React, { ReactNode, useContext } from 'react';
import isEqual from 'react-fast-compare';
import { Text } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import BaseInput from '@/components/ui/text-input/BaseInput';
import { SelectInputComponentProps } from '@/components/ui/text-input/select/SelectInput';
import UserImageRow from '@/components/ui/text-input/select/row/UserImageRow';
import { ChevronDownIcon } from '@/constants/Icon';
import { SelectInputContext, SelectInputData } from '@/context/utils/SelectInputContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
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

const UserSelectInput: React.FC<SelectInputComponentProps<GroupMemberDetails>> = ({
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

  const handleSelect = (item: SelectInputData<any>) => {
    onSelect(item.value);
    router.back();
  };

  const createRow = (item: SelectInputData<any>, selected: boolean): ReactNode => {
    return <UserImageRow item={item} selected={selected} />;
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

  const { data: profilePicture } = useProfilePicture(value?.id, value?.attachmentId);

  const selectedAvatar = () => {
    return <CustomImage image={profilePicture} size="small" />;
  };

  return (
    <BaseInput
      disabled={disabled}
      label={label}
      errorMessages={errorMessages}
      linkLabel={linkLabel}
      handlePress={handlePress}
      middleSection={getValueLabel()}
      rightSection={getDownArrowIcon()}
      leftSection={selectedAvatar()}
      showErrors={showErrors}
    />
  );
};

export default UserSelectInput;
