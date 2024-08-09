import React from 'react';
import { Modal, Text, View } from 'react-native';

import { CustomButton } from '@/components';

interface CustomPopoverProps {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  title,
  description,
  buttonTitle,
  onPress,
}) => {
  return (
    <Modal transparent>
      <View className=" w-full h-full flex-col justify-center items-center">
        <View className="absolute w-full h-full opacity-70 bg-ink-darkest" />
        <View className="bg-sky-lightest w-[327px] h-[320px] p-[24px] justify-between rounded-2xl">
          <View className="flex-col justify-start items-start gap-2 flex">
            <Text className="font-bold text-title3 text-ink-darkest text-center w-full">
              {title}
            </Text>
            <Text className="font-thin text-regular text-ink-lighter text-center w-full">
              {description}
            </Text>
          </View>
          <View className="w-full">
            <CustomButton onPress={onPress} title={buttonTitle} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopover;
