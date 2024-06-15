import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary-base rounded-[32px] h-[48px] flex flex-row justify-center items-center ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}>
      <Text className="font-color text-sky-lightest font-semibold">{title}</Text>

      {isLoading && (
        <ActivityIndicator animating={isLoading} color="#E3E5E5" size="small" className="ml-2" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
