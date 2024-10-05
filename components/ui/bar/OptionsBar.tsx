import React from 'react';
import { Text, View } from 'react-native';

interface OptionsBarProps {
  leftText: string;
  rightText: string;
  leftCaption?: string;
  rightCaption?: string;
}

const OptionsBar: React.FC<OptionsBarProps> = ({
  leftText,
  rightText,
  leftCaption,
  rightCaption,
}) => {
  return (
    <View className="flex-row w-full justify-between items-center px-3 py-3">
      <View className="flex-col w-1/2">
        <Text className="text-small text-ink-darkest dark:text-sky-lightest">{leftText}</Text>
        {leftCaption && <Text className="text-tiny text-ink-lighter">{leftCaption}</Text>}
      </View>

      <View className="flex-col w-1/2">
        <Text selectable className="text-small text-ink-darkest dark:text-sky-lightest text-right">
          {rightText}
        </Text>
        {rightCaption && (
          <Text selectable className="text-tiny text-ink-lighter text-right">
            {rightCaption}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OptionsBar;
