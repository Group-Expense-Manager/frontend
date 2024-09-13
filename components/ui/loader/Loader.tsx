import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

import theme from '@/constants/Colors';

const Loader: React.FC = () => {
  return <ActivityIndicator animating color={theme.primary.base} size={50} />;
};

export default Loader;
