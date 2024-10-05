import React, { ReactElement } from 'react';
import { View } from 'react-native';

interface BoxProps {
  type?: 'wide' | 'normal';
  children: ReactElement;
}

const Box: React.FC<BoxProps> = ({ type = 'normal', children }) => {
  return (
    <View
      className={`bg-sky-lightest dark:bg-ink-darkest h-full  ${type === 'wide' ? 'px-4' : 'px-8'}`}>
      {children}
    </View>
  );
};

export default Box;
