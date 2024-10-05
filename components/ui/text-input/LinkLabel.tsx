import React from 'react';
import { Text } from 'react-native';

import LinkLabelProps from '@/components/ui/text-input/LinkLabelProps';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

const LinkLabel: React.FC<LinkLabelProps> = ({ label = '', onPress = () => {} }) => {
  return (
    <SingleClickTouchableOpacity
      onPress={onPress}
      className="flex-1 justify-start items-end w-full h-full">
      <Text className="text-primary-base font-light text-small text-right text-decoration-line: underline">
        {label}
      </Text>
    </SingleClickTouchableOpacity>
  );
};

export default LinkLabel;
