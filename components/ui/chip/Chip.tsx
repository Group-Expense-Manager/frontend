import React, { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import { ChipChevronDownIcon, ChipFilterLinesIcon, ChipXIcon } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

interface ChipProps {
  text: string;
  type: 'normal' | 'remove' | 'select' | 'filter';
  onPress?: () => void;
  imageUri?: string;
}

const Chip: React.FC<ChipProps> = ({ text, type, onPress = () => {}, imageUri }) => {
  const paddingRight = imageUri! ? (type === 'normal' ? 12 : 8) : type === 'normal' ? 16 : 12;
  const paddingLeft = imageUri! ? 4 : 16;
  const borderRadius = imageUri! ? 'rounded-2xl' : 'rounded-lg';

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
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{ paddingLeft, paddingRight }}
      className={`h-8 ${borderRadius} space-x-2 flex-row items-center justify-center  bg-primary-lightest dark:bg-ink-dark`}>
      {imageUri && <CustomImage imageUri={imageUri} size="tiny" />}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-center text-regular text-primary-base max-w-[120px]">
        {text}
      </Text>
      {getIcon()}
    </TouchableOpacity>
  );
};

export default Chip;
