import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import ErrorLabel from '@/components/ui/text-input/ErrorLabel';
import LinkLabel from '@/components/ui/text-input/LinkLabel';
import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';

const getBorderStyle = (errorMessage: string, focused: boolean, disabled: boolean) => {
  let borderStyle = 'h-14 flex justify-center w-full rounded-lg';
  switch (true) {
    case disabled:
      borderStyle += ' border-sky-base border dark:bg-ink-dark dark:border-ink-darker';
      break;
    case !!errorMessage:
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
    case isFocused || !middleSectionExist:
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
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  errorMessage: string;
  linkLabel?: LinkLabelProps;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  middleSection?: React.ReactNode;
  handlePress?: () => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  disabled = false,
  isFocused,
  setIsFocused,
  label = '',
  errorMessage = '',
  linkLabel,
  leftSection,
  rightSection,
  middleSection,
  handlePress = () => {},
}) => {
  {
    const handleTouchable = () => {
      if (!disabled) {
        setIsFocused(true);
        handlePress();
      }
    };

    return (
      <View className="p-4 w-full h-24">
        <TouchableWithoutFeedback onPress={handleTouchable}>
          <View className={getBorderStyle(errorMessage, isFocused, disabled)}>
            {!leftSection && (
              <View className="flex p-2 items-center justify-center">{leftSection}</View>
            )}
            <View className="p-2">
              <Text className={getLabelStyle(isFocused, !middleSection, disabled)}>{label}</Text>
              {middleSection}
            </View>
            {!rightSection && (
              <View className="flex p-2 items-center justify-center">{rightSection}</View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View className="flex justify-between items-center flex-row p-2">
          {!!errorMessage && <ErrorLabel errorMessage={errorMessage} />}
          {!!linkLabel && <LinkLabel label={linkLabel.label} onPress={linkLabel.onPress} />}
        </View>
      </View>
    );
  }
};

export default BaseInput;
