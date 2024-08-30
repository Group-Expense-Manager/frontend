import React from 'react';
import { View, Text } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';

interface ProfileHeaderProps {
  imageUri: string;
  name?: string;
  username: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ imageUri, name = null, username }) => {
  return (
    <View className="flex-row w-full justify-start px-3 space-x-3">
      <CustomImage imageUri={imageUri} size="large" />
      <View className="items-start justify-center flex-1">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-ink-darkest dark:text-sky-lightest text-large font-semibold w-full">
          {name === null ? username : name}
        </Text>
        {name && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-small w-full text-ink-darkest dark:text-sky-lightest">
            {username}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
