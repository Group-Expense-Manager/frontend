import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import { IconSize } from '@/util/IconSize';

interface ListItemInfoCardProps {
  image: ImageBase64;
  title?: string;
  details: string;
  iconProps?: IconProps;
}

interface IconProps {
  icon: ReactElement;
  color: string;
  darkModeColor?: string;
  onPress?: () => void;
}

const ListItemInfoCard: React.FC<ListItemInfoCardProps> = ({
  image,
  title = null,
  details,
  iconProps = null,
}) => {
  const { colorScheme } = useColorScheme();

  const clonedIcon = iconProps
    ? React.cloneElement(iconProps.icon, {
        width: IconSize.MEDIUM,
        height: IconSize.MEDIUM,
        strokeWidth: 1,
        stroke: !iconProps.darkModeColor
          ? iconProps.color
          : colorScheme === 'light'
            ? iconProps.color
            : iconProps.darkModeColor,
      })
    : undefined;

  return (
    <View className="flex-row w-full justify-start p-3 space-x-3">
      <View className="flex-row flex-1 justify-start items-center space-x-3">
        <View className="py-1">
          <CustomImage image={image} size="medium" />
        </View>
        <View className="items-start justify-center flex-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-ink-darkest dark:text-sky-lightest text-large font-semibold w-full">
            {title === null ? details : title}
          </Text>
          {title && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-small w-full text-ink-base dark:text-ink-lighter">
              {details}
            </Text>
          )}
        </View>
      </View>
      {!!iconProps && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={iconProps.onPress}
          className="justify-center">
          {clonedIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItemInfoCard;
