import React, { ReactElement } from 'react';
import { Text } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { ChipChevronDownIcon, ChipFilterLinesIcon, ChipXIcon } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

interface ChipProps {
  text: string;
  type: 'normal' | 'remove' | 'select' | 'filter';
  onPress?: () => void;
  image?: ImageBase64;
}

const Chip: React.FC<ChipProps> = ({ text, type, onPress = () => {}, image }) => {
  const paddingRight = image! ? (type === 'normal' ? 12 : 8) : type === 'normal' ? 16 : 12;
  const paddingLeft = image! ? 4 : 16;
  const borderRadius = image! ? 'rounded-2xl' : 'rounded-lg';

  function getIcon(): ReactElement | null {
    switch (type) {
      case 'remove':
        return <ChipXIcon width={IconSize.TINY} height={IconSize.TINY} />;
      case 'select':
        return <ChipChevronDownIcon width={IconSize.TINY} height={IconSize.TINY} />;
      case 'filter':
        return <ChipFilterLinesIcon width={IconSize.TINY} height={IconSize.TINY} />;
      default:
        return null;
    }
  }

  return (
    <SingleClickTouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{ paddingLeft, paddingRight }}
      className={`h-8 ${borderRadius} space-x-2 flex-row items-center justify-center  bg-primary-lightest dark:bg-ink-dark`}>
      {image && <CustomImage image={image} size="tiny" />}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-center text-regular text-primary-base max-w-[120px]">
        {text}
      </Text>
      {getIcon()}
    </SingleClickTouchableOpacity>
  );
};

export default Chip;
