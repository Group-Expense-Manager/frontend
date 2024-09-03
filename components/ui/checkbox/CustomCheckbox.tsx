import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import theme from '@/constants/Colors';
import { CheckIcon } from '@/constants/Icon';
import { Availability } from '@/util/Availability';
import { IconSize } from '@/util/IconSize';

interface CustomCheckboxProps {
  disabled?: boolean;
  value: boolean;
  onValueChange: () => void;
}

enum CheckboxState {
  CHECKED = 'CHECKED',
  UNCHECKED = 'UNCHECKED',
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  disabled = false,
  value,
  onValueChange,
}) => {
  const { colorScheme } = useColorScheme();

  function toggleCheckbox() {
    if (!disabled) {
      onValueChange();
    }
  }

  function backgroundColor(): string {
    const disabledChecked = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED}`;

    switch (disabledChecked) {
      case `${Availability.DISABLED}-${CheckboxState.CHECKED}`:
        return 'bg-sky-light dark:bg-ink-darker';
      case `${Availability.ENABLED}-${CheckboxState.CHECKED}`:
        return 'bg-primary-base';
      default:
        return '';
    }
  }
  function iconColor(): string {
    const disabledChecked = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED}`;

    switch (disabledChecked) {
      case `${Availability.DISABLED}-${CheckboxState.CHECKED}`:
        return colorScheme === 'light' ? theme.sky.lighter : theme.ink.dark;
      case `${Availability.ENABLED}-${CheckboxState.CHECKED}`:
        return theme.sky.lightest;
      default:
        return '';
    }
  }

  function border(): string {
    const disabledChecked = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED}`;

    switch (disabledChecked) {
      case `${Availability.ENABLED}-${CheckboxState.UNCHECKED}`:
        return 'border border-sky-base dark:border-ink-light';
      case `${Availability.DISABLED}-${CheckboxState.UNCHECKED}`:
        return 'border border-sky-light dark:border-ink-dark';
      default:
        return '';
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={toggleCheckbox}
      className={`${backgroundColor()} px-[2px] w-6 h-6 items-center justify-center rounded-[4px] ${border()}`}>
      <CheckIcon stroke={iconColor()} width={IconSize.TINY} height={IconSize.TINY} />
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
