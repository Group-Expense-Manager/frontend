import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import { CustomButtonProps } from '@/components/ui/button/CustomButton';
import BasicPopover from '@/components/ui/popover/BasicPopover';

interface DoubleButtonPopoverProps {
  title: string;
  description: string;
  middleSection?: ReactNode;
  firstButtonProps: CustomButtonProps;
  secondButtonProps: CustomButtonProps;
  isLoading?: boolean;
}

const DoubleButtonPopover: React.FC<DoubleButtonPopoverProps> = ({
  title,
  description,
  middleSection,
  firstButtonProps,
  secondButtonProps,
  isLoading = false,
}) => {
  return (
    <BasicPopover
      title={title}
      description={description}
      middleSection={middleSection}
      bottomSection={
        <View className="w-full space-y-3">
          <View className="w-full">
            <CustomButton {...firstButtonProps} />
          </View>
          <View className="w-full">
            <CustomButton {...secondButtonProps} />
          </View>
        </View>
      }
      isLoading={isLoading}
    />
  );
};

export default DoubleButtonPopover;
