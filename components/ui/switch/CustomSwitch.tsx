import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CustomSwitchProps {
  disabled?: boolean;
  defaultValue?: boolean;
  onValueChange?: () => void;
}

enum Availability {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

enum SwitchState {
  ON = 'ON',
  OFF = 'OFF',
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  disabled = false,
  defaultValue = true,
  onValueChange = () => {},
}) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const thumbPosition = isOn ? 'justify-end' : 'justify-start';
  const hasBorder = !isOn && disabled;

  function toggleSwitch() {
    if (!disabled) {
      setIsOn(!isOn);
      onValueChange();
    }
  }

  function thumbColor(): string {
    const disabledOn = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${isOn ? SwitchState.ON : SwitchState.OFF}`;

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
    const disabledOn = `${disabled ? Availability.DISABLED : Availability.ENABLED}-${isOn ? SwitchState.ON : SwitchState.OFF}`;

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
    <TouchableOpacity
      activeOpacity={1}
      onPress={toggleSwitch}
      className={`flex-row ${thumbPosition} items-center px-[2px] w-[56px] h-[32px]  rounded-[32px] ${trackColor()}
        ${hasBorder ? 'border border-sky-light dark:border-ink-dark' : ''}
        `}>
      <View className={`w-[28px] h-[28px]  rounded-[14px] ${thumbColor()}`} />
    </TouchableOpacity>
  );
};

export default CustomSwitch;
