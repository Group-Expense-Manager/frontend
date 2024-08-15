import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CustomSwitchProps {
  disabled?: boolean;
  defaultValue?: boolean;
  onValueChange?: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  disabled = false,
  defaultValue = true,
  onValueChange = () => {},
}) => {
  const { colorScheme } = useColorScheme();
  const [isOn, setIsOn] = useState(defaultValue);

  const thumbPosition = isOn ? 'justify-end' : 'justify-start';
  const hasBorder = !isOn && disabled;
  const borderColor = colorScheme === 'dark' ? 'border-ink-dark' : 'border-sky-light';

  function toggleSwitch() {
    if (!disabled) {
      setIsOn(!isOn);
      onValueChange();
    }
  }

  function thumbColor(): string {
    if (disabled) {
      if (colorScheme === 'light') {
        if (isOn) {
          return 'bg-sky-lighter';
        }
        return 'bg-sky-light';
      }
      return 'bg-ink-dark';
    }
    return 'bg-sky-lightest';
  }

  function trackColor(): string {
    if (disabled) {
      if (isOn) {
        if (colorScheme === 'light') {
          return 'bg-sky-light';
        }
        return 'bg-ink-darker';
      }
      if (colorScheme === 'light') {
        return 'bg-sky-lightest';
      }
      return 'bg-ink-darkest';
    }

    if (isOn) {
      return 'bg-primary-base';
    }

    if (colorScheme === 'light') {
      return 'bg-sky-light';
    } else {
      return 'bg-ink-dark';
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={toggleSwitch}
        className={`flex-row ${thumbPosition} items-center px-[2px] w-[56px] h-[32px]  rounded-[32px] ${trackColor()}
        ${hasBorder ? `border ${borderColor}` : ''}
        `}>
        <View className={`w-[28px] h-[28px]  rounded-[14px] ${thumbColor()}`} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;
