import React from 'react';
import { ActivityIndicator } from 'react-native';

import theme from '@/constants/Colors';

interface LoaderProps {
  isLoading?: boolean;
  size?: 'small' | 'normal';
}

const getLoaderSize = (size: 'small' | 'normal') => {
  switch (size) {
    case 'small':
      return 35;
    case 'normal':
      return 50;
  }
};

const Loader: React.FC<LoaderProps> = ({ isLoading = true, size = 'normal' }) => {
  if (!isLoading) return <></>;
  return <ActivityIndicator animating color={theme.primary.base} size={getLoaderSize(size)} />;
};

export default Loader;
