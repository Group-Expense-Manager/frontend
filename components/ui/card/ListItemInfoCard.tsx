import { useColorScheme } from 'nativewind';
import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { IconSize } from '@/util/IconSize';

interface ListItemInfoCardProps {
  image?: ImageBase64;
  title?: string;
  details: string;
  onPress?: () => void;
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
  title,
  details,
  onPress,
  iconProps,
}) => {
  const { colorScheme } = useColorScheme();

  function getIconColor(props: IconProps) {
    return !props.darkModeColor
      ? props.color
      : colorScheme === 'light'
        ? props.color
        : props.darkModeColor;
  }

  function modifyIcon(props: IconProps) {
    return React.cloneElement(props.icon, {
      width: IconSize.MEDIUM,
      height: IconSize.MEDIUM,
      strokeWidth: 1,
      stroke: getIconColor(props),
    });
  }

  return (
    <View className="flex-row w-full justify-start p-3 space-x-3">
      <SingleClickTouchableOpacity
        disabled={!onPress}
        activeOpacity={0.7}
        onPress={onPress}
        className="flex-row flex-1 justify-start items-center space-x-3">
        <View className="py-1">
          <CustomImage image={image} size="medium" />
        </View>
        <View className="items-start justify-center flex-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-ink-darkest dark:text-sky-lightest text-large font-semibold w-full">
            {title ? title : details}
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
      </SingleClickTouchableOpacity>
      {!!iconProps && (
        <SingleClickTouchableOpacity
          activeOpacity={0.7}
          onPress={iconProps.onPress}
          className="justify-center">
          {modifyIcon(iconProps)}
        </SingleClickTouchableOpacity>
      )}
    </View>
  );
};

export default ListItemInfoCard;
