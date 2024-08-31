import React from 'react';
import { Image } from 'react-native';

interface CustomImageProps {
  imageUri: string;
  size: 'tiny' | 'small' | 'medium' | 'large' | 'colossal';
}

const CustomImage: React.FC<CustomImageProps> = ({ imageUri, size = 'large' }) => {
  function getSizeInPx(): number {
    switch (size) {
      case 'tiny':
        return 24;
      case 'small':
        return 32;
      case 'medium':
        return 50;
      case 'large':
        return 70;
      case 'colossal':
        return 150;
    }
  }
  const sizeInPx = getSizeInPx();
  return (
    <Image
      width={sizeInPx}
      height={sizeInPx}
      borderRadius={sizeInPx / 2}
      source={{ uri: imageUri }}
    />
  );
};

export default CustomImage;
