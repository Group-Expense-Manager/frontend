import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface LinkLabelProps {
  label: string;
  onPress: () => void;
}

const LinkLabel: React.FC<LinkLabelProps> = ({ label = '', onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1 justify-start items-end w-full h-full">
      <Text className="text-primary-base font-light text-small text-right text-decoration-line: underline">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkLabel;
