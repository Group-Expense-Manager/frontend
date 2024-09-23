import React from 'react';
import { Dimensions, View } from 'react-native';

import Loader from '@/components/ui/loader/Loader';

interface FullViewLoaderProps {
  isLoading?: boolean;
}

const FullViewLoader: React.FC<FullViewLoaderProps> = ({ isLoading = false }) => {
  const screenHeight = Dimensions.get('screen').height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-sky-lightest/40 dark:bg-ink-darkest/40 z-10"
      style={{
        height: screenHeight,
      }}>
      <Loader />
    </View>
  );
};

export default FullViewLoader;
