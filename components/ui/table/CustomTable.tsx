import React from 'react';
import { View, Text } from 'react-native';

import CustomSwitch from '@/components/ui/switch/CustomSwitch';

interface CustomTableProps {
  title: string;
  caption?: string;
  disabled?: boolean;
  defaultValue?: boolean;
  onValueChange?: () => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  caption,
  disabled = false,
  defaultValue = true,
  onValueChange = () => {},
}) => {
  const titleColor = 'text-ink-darkest dark:text-sky-lightest';
  const captionColor = 'text-ink-lighter dark:text-sky-dark';

  return (
    <View className="w-full flex-row items-center justify-between h-16 px-6">
      <View className="flex-col justify-center">
        <Text className={`text-small font-bold text-ink-darkest ${titleColor}`}>{title}</Text>
        {caption && <Text className={`text-tiny text-ink-lighter ${captionColor}`}>{caption}</Text>}
      </View>
      <View className="flex-row items-center">
        <CustomSwitch
          disabled={disabled}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default CustomTable;
