import React, { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import { ChipChevronDownIcon, ChipFilterLinesIcon, ChipXIcon } from '@/constants/Icon';

interface ChipProps {
  text: string;
  type: 'normal' | 'remove' | 'select' | 'filter';
  onPress?: () => void;
  imageUri?: string;
}

const Chip: React.FC<ChipProps> = ({ text, type, onPress = () => {}, imageUri }) => {
  const paddingRight =
    imageUri === undefined ? (type === 'normal' ? 16 : 12) : type === 'normal' ? 12 : 8;
  const paddingLeft = imageUri === undefined ? 16 : 4;
  const borderRadius = imageUri === undefined ? 'rounded-lg' : 'rounded-2xl';

  function getIcon(): ReactElement | null {
    switch (type) {
      case 'remove':
        return <ChipXIcon />;
      case 'select':
        return <ChipChevronDownIcon />;
      case 'filter':
        return <ChipFilterLinesIcon />;
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
