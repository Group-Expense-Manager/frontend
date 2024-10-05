import React from 'react';
import { Text, View } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';

interface InfoCardProps {
  image?: ImageBase64;
  title?: string;
  details: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ image, title, details }) => {
  return (
    <View className="flex-row w-full justify-start px-3 space-x-3">
      <CustomImage image={image} size="large" />
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
            className="text-small w-full text-ink-darkest dark:text-sky-lightest">
            {details}
          </Text>
        )}
      </View>
    </View>
  );
};

export default InfoCard;
