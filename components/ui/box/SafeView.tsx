import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from './Box';

interface SafeViewProps {
  children: ReactElement;
}

const SafeView: React.FC<SafeViewProps> = ({ children }) => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <Box>{children}</Box>
      </SafeAreaView>
    </>
  );
};

export default SafeView;
