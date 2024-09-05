import React, { ReactElement } from 'react';
import { View } from 'react-native';

interface BoxProps {
  children: ReactElement;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return <View className="bg-sky-lightest dark:bg-ink-darkest h-full px-[32px]">{children}</View>;
};

export default Box;
