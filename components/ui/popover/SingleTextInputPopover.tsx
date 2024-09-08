import React from 'react';

import { CustomButtonProps } from '@/components/ui/button/CustomButton';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import SingleTextInput, { SingleTextInputProps } from '@/components/ui/text-input/SingleTextInput';

interface SingleTextInputPopoverProps {
  title: string;
  description: string;
  singleTextInputProps: SingleTextInputProps;
  firstButtonProps: CustomButtonProps;
  secondButtonProps: CustomButtonProps;
  isLoading?: boolean;
}

const SingleTextInputPopover: React.FC<SingleTextInputPopoverProps> = ({
  title,
  description,
  singleTextInputProps,
  firstButtonProps,
  secondButtonProps,
  isLoading = false,
}) => {
  return (
    <DoubleButtonPopover
      title={title}
      description={description}
      middleSection={<SingleTextInput {...singleTextInputProps} />}
      firstButtonProps={firstButtonProps}
      secondButtonProps={secondButtonProps}
      isLoading={isLoading}
    />
  );
};

export default SingleTextInputPopover;
