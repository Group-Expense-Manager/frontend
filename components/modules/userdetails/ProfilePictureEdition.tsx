import React from 'react';
import { View } from 'react-native';

import IconButton from '@/components/ui/button/IconButton';
import CustomImage from '@/components/ui/image/CustomImage';
import { EditIcon } from '@/constants/Icon';

interface ProfilePictureEditionProps {
  imageUri: string;
  onPress: () => void;
}

const ProfilePictureEdition: React.FC<ProfilePictureEditionProps> = ({ imageUri, onPress }) => {
  return (
    <View>
      <CustomImage imageUri={imageUri} size="colossal" />
      <View className="absolute bottom-0 right-0">
        <IconButton onPress={onPress} icon={<EditIcon />} />
      </View>
    </View>
  );
};

export default ProfilePictureEdition;
