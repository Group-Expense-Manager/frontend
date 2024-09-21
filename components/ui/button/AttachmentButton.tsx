import React, { useState } from 'react';
import { Image, View } from 'react-native';

import IconButton from '@/components/ui/button/IconButton';
import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { PlusIcon, TrashIcon } from '@/constants/Icon';

export interface AttachmentButtonProps {
  image?: ImageBase64;
  onAddPress: () => void;
  onRemovePress: () => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  image,
  onAddPress,
  onRemovePress,
}) => {
  const [parentWidth, setParentWidth] = useState(0);

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}>
      <View
        style={[{ width: '100%', height: parentWidth }]}
        className="bg-primary-lightest dark:bg-ink-base border-primary-base border-2 rounded-3xl justify-center items-center overflow-hidden">
        {image ? (
          <>
            <Image width={parentWidth} height={parentWidth} source={image} />
            <View className="absolute bottom-1 right-1">
              <IconButton icon={<TrashIcon />} onPress={onRemovePress} />
            </View>
          </>
        ) : (
          <IconButton icon={<PlusIcon />} onPress={onAddPress} />
        )}
      </View>
    </View>
  );
};

export default AttachmentButton;
