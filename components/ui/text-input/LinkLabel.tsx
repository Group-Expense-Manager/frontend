import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface LinkLabelProps {
  label: string;
  onPress: () => void;
}

const LinkLabel: React.FC<LinkLabelProps> = ({
                                               label = '',
                                               onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1 justify-center">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-primary-base font-light text-small text-right text-decoration-line: underline">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkLabel;
