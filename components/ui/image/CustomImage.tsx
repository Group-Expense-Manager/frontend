import React from 'react';
import { Image, View } from 'react-native';
export type ImageBase64 = {
  uri: string;
};

interface CustomImageProps {
  image: ImageBase64;
  size: 'tiny' | 'small' | 'medium' | 'large' | 'colossal';
}

const CustomImage: React.FC<CustomImageProps> = ({ image, size = 'large' }) => {
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
  return image.uri ? (
    <Image width={sizeInPx} height={sizeInPx} borderRadius={sizeInPx / 2} source={image} />
  ) : (
    <View
      className="bg-sky-light dark:bg-ink-dark"
      style={{ width: sizeInPx, height: sizeInPx, borderRadius: sizeInPx / 2 }}
    />
  );
};

export default CustomImage;
