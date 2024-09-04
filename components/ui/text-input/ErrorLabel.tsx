import React from 'react';
import { Text, View } from 'react-native';

interface ErrorLabelsProps {
  errorMessages: string[];
}

const ErrorLabels: React.FC<ErrorLabelsProps> = ({ errorMessages = [] }) => {
  return (
    <View className="flex-1 justify-start items-start w-full h-full space-y-px">
      {errorMessages.map((message, index) => (
        <Text
          key={index}
          ellipsizeMode="tail"
          className="w-full text-red-base text-small font-light text-left h-auto">
          {message}
        </Text>
      ))}
    </View>
  );
};

export default ErrorLabels;
