import React, { ReactNode } from 'react';
import { View } from 'react-native';

import CustomButton, { CustomButtonProps } from '@/components/ui/button/CustomButton';
import BasicPopover from '@/components/ui/popover/BasicPopover';

interface SingleButtonPopoverProps {
  title: string;
  description: string;
  middleSection?: ReactNode;
  buttonProps: CustomButtonProps;
}

const SingleButtonPopover: React.FC<SingleButtonPopoverProps> = ({
  title,
  description,
  middleSection,
  buttonProps,
}) => {
  return (
    <BasicPopover
      title={title}
      description={description}
      middleSection={middleSection}
      bottomSection={
        <View className="w-full">
          <CustomButton {...buttonProps} />
        </View>
      }
    />
  );
};

export default SingleButtonPopover;
