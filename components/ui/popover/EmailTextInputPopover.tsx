import React from 'react';

import { CustomButtonProps } from '@/components/ui/button/CustomButton';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import EmailTextInput, { EmailTextInputProps } from '@/components/ui/text-input/EmailTextInput';

interface EmailTextInputPopoverProps {
  title: string;
  description: string;
  emailTextInputProps: EmailTextInputProps;
  firstButtonProps: CustomButtonProps;
  secondButtonProps: CustomButtonProps;
  isLoading?: boolean;
}

const EmailTextInputPopover: React.FC<EmailTextInputPopoverProps> = ({
  title,
  description,
  emailTextInputProps,
  firstButtonProps,
  secondButtonProps,
  isLoading = false,
}) => {
  return (
    <DoubleButtonPopover
      title={title}
      description={description}
      middleSection={<EmailTextInput {...emailTextInputProps} />}
      firstButtonProps={firstButtonProps}
      secondButtonProps={secondButtonProps}
      isLoading={isLoading}
    />
  );
};

export default EmailTextInputPopover;
