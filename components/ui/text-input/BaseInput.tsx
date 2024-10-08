import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import ErrorLabels from '@/components/ui/text-input/ErrorLabel';
import LinkLabel from '@/components/ui/text-input/LinkLabel';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const getBorderStyle = (isErrorMessage: boolean, focused: boolean, disabled: boolean) => {
  let borderStyle = 'h-14 flex justify-center w-full rounded-lg';
  switch (true) {
    case disabled:
      borderStyle += ' border-sky-base border dark:bg-ink-dark dark:border-ink-darker';
      break;
    case isErrorMessage:
      borderStyle += ' border-red-base border-2 dark:border-red-dark dark:bg-ink-darker';
      break;
    case focused:
      borderStyle += ' border-primary-base border-2 dark:bg-ink-darker';
      break;
    default:
      borderStyle += ' border-sky-base border dark:border-ink-dark dark:bg-ink-darker';
      break;
  }
  return borderStyle;
};

const getLabelStyle = (isFocused: boolean, middleSectionExist: boolean, disabled: boolean) => {
  let labelStyle = 'text-left font-regular text-ink-lighter dark:text-sky-dark';
  switch (true) {
    case disabled:
      labelStyle += ' dark:text-ink-lighter';
      break;
    case isFocused || middleSectionExist:
      labelStyle += ' text-tiny';
      break;
    default:
      labelStyle += ' text-regular';
      break;
  }
  return labelStyle;
};

interface BaseInputProps {
  disabled: boolean;
  isFocused?: boolean;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  errorMessages: string[];
  linkLabel?: LinkLabelProps;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  middleSection?: React.ReactNode;
  handlePress?: () => void;
  showErrors: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({
  disabled = false,
  isFocused = false,
  setIsFocused = () => {},
  label = '',
  errorMessages = [],
  linkLabel,
  leftSection,
  rightSection,
  middleSection,
  handlePress = () => {},
  showErrors,
}) => {
  const handleTouchable = () => {
    if (!disabled) {
      setIsFocused(true);
      handlePress();
    }
  };

  return (
    <View className="w-full">
      <TouchableWithoutFeedback onPress={handleTouchable}>
        <View
          className={`${getBorderStyle(!!errorMessages.length || showErrors, isFocused, disabled)} flex flex-row items-center`}>
          {!!leftSection && (
            <View className="flex p-2 items-start justify-center flex-2">{leftSection}</View>
          )}
          <View className="p-2 flex-1">
            <Text className={getLabelStyle(isFocused, !!middleSection, disabled)}>{label}</Text>
            {middleSection}
          </View>
          {!!rightSection && (
            <View className="flex p-2 items-end justify-center flex-2">{rightSection}</View>
          )}
        </View>
      </TouchableWithoutFeedback>
      {(!!errorMessages.length || !!linkLabel) && (
        <View className="flex justify-between items-center flex-row p-2">
          {!!errorMessages.length && <ErrorLabels errorMessages={errorMessages} />}
          {!!linkLabel && <LinkLabel label={linkLabel.label} onPress={linkLabel.onPress} />}
        </View>
      )}
    </View>
  );
};

export default BaseInput;
