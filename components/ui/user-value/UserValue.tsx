import React from 'react';
import { Text, View } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

interface UserValueProps {
  type: 'balance' | 'weight' | 'cost';
  user: string;
  image?: ImageBase64;
  value: number;
  currency?: string;
  onPress?: () => void;
}

const UserValue: React.FC<UserValueProps> = ({ type, user, image, value, currency, onPress }) => {
  const rightText = () => {
    const valueAsString = value.toString().replace('.', ',');
    switch (type) {
      case 'weight':
        return `${valueAsString}`;
      default:
        return `${valueAsString} ${currency}`;
    }
  };

  const rightTextColor = () => {
    switch (true) {
      case type === 'balance' && value > 0:
        return 'text-green-dark dark:text-green-base';
      case type === 'balance' && value < 0:
        return 'text-red-dark dark:text-red-base';
      default:
        return 'text-ink-darkest dark:text-sky-lightest';
    }
  };

  return (
    <SingleClickTouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-primary-lightest dark:bg-ink-base border-primary-base border-2 rounded-lg flex-row px-2 py-1.5 space-x-2">
      <View>
        <CustomImage size="small" image={image} />
      </View>
      <View className="flex-1 flex-row justify-between items-center space-x-2">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="flex-1 font-bold text-regular text-ink-darkest dark:text-sky-lightest">
          {user}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`font-bold text-regular text-right max-w-[50%] ${rightTextColor()}`}>
          {rightText()}
        </Text>
      </View>
    </SingleClickTouchableOpacity>
  );
};

export default UserValue;
