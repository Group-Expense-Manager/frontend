import React from 'react';
import { Text } from 'react-native';

interface LinkLabelProps {
  errorMessage: string;
}

const LinkLabel: React.FC<LinkLabelProps> = ({ errorMessage = '' }) => {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      className="flex-1 text-red-base text-small font-light text-left">
      {errorMessage}
    </Text>
  );
};

export default LinkLabel;
