import React from 'react';
import { Text, View } from 'react-native';

interface NavBarProps {
  title: string;
  type: 'normal' | 'segment';
}

const NavBar: React.FC<NavBarProps> = ({ title, type }) => {
  const textSize = type === 'normal' ? 'text-title2' : 'text-title3';
  return (
    <View className="w-full">
      <Text className={`${textSize} font-bold text-ink-darkest dark:text-sky-lightest`}>
        {title}
      </Text>
    </View>
  );
};

export default NavBar;
