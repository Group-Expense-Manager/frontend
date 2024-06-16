import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

interface TabIconProps {
  name: string;
  children: ReactElement;
}

export const TabIcon: React.FC<TabIconProps> = ({ name, children }) => {
  const clonedIcon = React.cloneElement(children, { width: 40, height: 40 });
  return (
    <View className="flex items-center justify-center gap-2">
      {clonedIcon}
      <Text className="text-title3">{name}</Text>
    </View>
  );
};

export default TabIcon;
