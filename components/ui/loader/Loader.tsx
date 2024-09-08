import React from 'react';
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native';

interface LoaderProps {
  isLoading?: boolean;
  hasViewHeader?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading = false, hasViewHeader = false }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('window').height - (hasViewHeader ? 96 : 0); // height of header * 2;
  if (!isLoading) return null;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-primary/60 z-10"
      style={{
        height: screenHeight,
      }}>
      <ActivityIndicator
        animating={isLoading}
        color="#E3E5E5"
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  );
};

export default Loader;
