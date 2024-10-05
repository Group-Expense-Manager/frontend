import React from 'react';
import { View } from 'react-native';

import { Availability } from '@/util/Availability';

interface CustomSwitchProps {
  disabled?: boolean;
  value: boolean;
}

enum SwitchState {
  ON = 'ON',
  OFF = 'OFF',
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ disabled = false, value }) => {
  const thumbPosition = value ? 'justify-end' : 'justify-start';
  const hasBorder = !value && disabled;

  function thumbColor(): string {
    const disabledOn = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${value ? SwitchState.ON : SwitchState.OFF}`;

    switch (disabledOn) {
      case `${Availability.DISABLED}-${SwitchState.ON}`:
        return 'bg-sky-lighter dark:bg-ink-dark';
      case `${Availability.DISABLED}-${SwitchState.OFF}`:
        return 'bg-sky-light dark:bg-ink-dark';
      case `${Availability.ENABLED}-${SwitchState.ON}`:
        return 'bg-sky-lightest';
      case `${Availability.ENABLED}-${SwitchState.OFF}`:
        return 'bg-sky-lightest';
      default:
        return '';
    }
  }

  function trackColor(): string {
    const disabledOn = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${value ? SwitchState.ON : SwitchState.OFF}`;

    switch (disabledOn) {
      case `${Availability.DISABLED}-${SwitchState.ON}`:
        return 'bg-sky-light dark:bg-ink-darker';
      case `${Availability.DISABLED}-${SwitchState.OFF}`:
        return 'bg-sky-lightest dark:bg-ink-darkest';
      case `${Availability.ENABLED}-${SwitchState.ON}`:
        return 'bg-primary-base';
      case `${Availability.ENABLED}-${SwitchState.OFF}`:
        return 'bg-sky-light dark:bg-ink-dark';
      default:
        return '';
    }
  }

  return (
    <View
      className={`flex-row ${thumbPosition} items-center px-[2px] w-[56px] h-[32px]  rounded-[32px] ${trackColor()}
        ${hasBorder ? 'border border-sky-light dark:border-ink-dark' : ''}
        `}>
      <View className={`w-[28px] h-[28px]  rounded-[14px] ${thumbColor()}`} />
    </View>
  );
};

export default CustomSwitch;
