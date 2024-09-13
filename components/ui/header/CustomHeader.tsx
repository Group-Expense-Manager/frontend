import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { FullViewLoader } from '@/components';
import IconButton from '@/components/ui/button/IconButton';
import theme from '@/constants/Colors';
import { ArrowLeftIcon } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

interface CustomHeaderProps {
  title: string;
  onLeftIconPress?: () => void;
  rightIcon?: ReactElement;
  onRightIconPress?: () => void;
  isLoading?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onLeftIconPress = () => router.back(),
  rightIcon,
  onRightIconPress,
  isLoading = false,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <FullViewLoader isLoading={isLoading} />
      <View className="flex-row w-full h-24 justify-between items-center px-[20px] bg-sky-lightest dark:bg-ink-darkest">
        <TouchableOpacity onPress={onLeftIconPress}>
          <ArrowLeftIcon
            width={IconSize.LARGE}
            height={IconSize.LARGE}
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
    </>
  );
};

export default CustomHeader;
