import { useColorScheme } from 'nativewind';
import React from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

import theme from '@/constants/Colors';

interface CustomRefreshControlProps extends RefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({
  refreshing,
  onRefresh,
  ...props
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <RefreshControl
      {...props}
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.primary.base]}
      progressBackgroundColor={colorScheme === 'light' ? theme.sky.lighter : theme.ink.darker}
    />
  );
};

export default CustomRefreshControl;
