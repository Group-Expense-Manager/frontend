import React from 'react';
import { View } from 'react-native';

import IconButton from '@/components/ui/button/IconButton';
import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import { EditIcon } from '@/constants/Icon';

interface ProfilePictureEditionProps {
  image: ImageBase64;
  onPress: () => void;
}

const ProfilePictureEdition: React.FC<ProfilePictureEditionProps> = ({ image, onPress }) => {
  return (
    <View className="flex-col items-start self-center">
      <CustomImage image={image} size="colossal" />
      <View className="absolute bottom-0 right-0">
        <IconButton onPress={onPress} icon={<EditIcon />} />
      </View>
    </View>
  );
};

export default ProfilePictureEdition;
