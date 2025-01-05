import React from 'react';
import { Text, View } from 'react-native';

interface CustomTableProps {
  title: string;
  caption?: string;
  children?: React.ReactElement;
  textSize?: 'small' | 'large';
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  caption,
  children,
  textSize = 'small',
}) => {
  const titleColor = 'text-ink-darkest dark:text-sky-lightest';
  const captionColor = 'text-ink-lighter dark:text-sky-dark';

  const getTextSize = () => {
    return textSize === 'small' ? 'text-small' : 'text-title3';
  };

  return (
    <View className="w-full flex-row items-center justify-between h-16">
      <View className="flex-col justify-center">
        <Text className={`${getTextSize()} font-bold text-ink-darkest ${titleColor}`}>{title}</Text>
        {caption && <Text className={`text-tiny text-ink-lighter ${captionColor}`}>{caption}</Text>}
      </View>
      <View className="w-16 flex-row justify-center items-center">{children}</View>
    </View>
  );
};

export default CustomTable;
