import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import IconButton from '@/components/ui/button/IconButton';
import theme from '@/constants/Colors';
import { ArrowLeftIcon } from '@/constants/Icon';

interface CustomHeaderProps {
  title: string;
  rightIcon?: ReactElement;
  onRightIconPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, rightIcon, onRightIconPress }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row w-full h-24 justify-between items-center px-[20px] bg-sky-lightest dark:bg-ink-darkest">
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeftIcon
          width={48}
          height={48}
          stroke={colorScheme === 'light' ? theme.ink.darkest : theme.sky.lightest}
        />
      </TouchableOpacity>
      <Text className="text-title2 text-ink-darkest dark:text-sky-lightest font-bold text-center flex-1">
        {title}
      </Text>
      <View className="w-12 h-12">
        {rightIcon && onRightIconPress && (
          <IconButton onPress={onRightIconPress!} icon={rightIcon!} />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
