import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import Loader from '@/components/ui/loader/Loader';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';

export interface ActivityAttachmentProps {
  groupId: string;
  attachmentId: string;
}

const ActivityAttachment: React.FC<ActivityAttachmentProps> = ({ groupId, attachmentId }) => {
  const { data: attachment } = useGroupPicture(groupId, attachmentId);
  const [parentWidth, setParentWidth] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<
    { width: number; height: number } | undefined
  >(undefined);

  useEffect(() => {
    if (attachment) {
      Image.getSize(attachment?.uri, (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = parentWidth * aspectRatio;
        setImageDimensions({ width: parentWidth, height: calculatedHeight });
      });
    }
  }, [attachment, parentWidth]);

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}>
      <View className="bg-primary-lightest dark:bg-ink-base border-primary-base border-2 rounded-3xl justify-center items-center overflow-hidden">
        {imageDimensions ? (
          <Image style={imageDimensions} resizeMode="cover" source={attachment} />
        ) : (
          <View
            className="items-center justify-center"
            style={[{ width: '100%', height: parentWidth }]}>
            <Loader />
          </View>
        )}
      </View>
    </View>
  );
};

export default ActivityAttachment;
