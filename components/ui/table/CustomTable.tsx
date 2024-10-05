import React from 'react';
import { Text, View } from 'react-native';

interface CustomTableProps {
  title: string;
  caption?: string;
  children?: React.ReactElement;
}

const CustomTable: React.FC<CustomTableProps> = ({ title, caption, children }) => {
  const titleColor = 'text-ink-darkest dark:text-sky-lightest';
  const captionColor = 'text-ink-lighter dark:text-sky-dark';

  return (
    <View className="w-full flex-row items-center justify-between h-16 px-6">
      <View className="flex-col justify-center">
        <Text className={`text-small font-bold text-ink-darkest ${titleColor}`}>{title}</Text>
        {caption && <Text className={`text-tiny text-ink-lighter ${captionColor}`}>{caption}</Text>}
      </View>
      <View className="w-16 flex-row justify-center items-center">{children}</View>
    </View>
  );
};

export default CustomTable;
