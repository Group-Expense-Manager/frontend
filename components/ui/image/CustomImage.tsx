import React from 'react';
import { Image } from 'react-native';

interface CustomImageProps {
  imageUri: string;
  size: 'tiny' | 'small' | 'medium' | 'large' | number;
}

const CustomImage: React.FC<CustomImageProps> = ({ imageUri, size = 'large' }) => {
  function getSizeInPx(): number {
    switch (size) {
      case 'tiny':
        return 24;
      case 'small':
        return 32;
      case 'medium':
        return 40;
      case 'large':
        return 64;
      default:
        return size;
    }
  }
  const sizeInPx = getSizeInPx();
  return (
    <Image
      width={sizeInPx}
      height={sizeInPx}
      borderRadius={sizeInPx / 2}
      resizeMode="contain"
      source={{ uri: imageUri }}
    />
  );
};

export default CustomImage;
