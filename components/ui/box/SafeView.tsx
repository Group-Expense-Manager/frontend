import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from './Box';

interface SafeViewProps {
  type?: 'wide' | 'normal';
  children: ReactElement;
}

const SafeView: React.FC<SafeViewProps> = ({ type = 'normal', children }) => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <Box type={type}>{children}</Box>
      </SafeAreaView>
    </>
  );
};

export default SafeView;
