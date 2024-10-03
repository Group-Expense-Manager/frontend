import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Text, View } from 'react-native';

import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

interface OptionsBarProps {
  leftText: string;
  rightText: string;
  leftCaption?: string;
  rightCaption?: string;
  copiable?: boolean;
}

const OptionsBar: React.FC<OptionsBarProps> = ({
  leftText,
  rightText,
  leftCaption,
  rightCaption,
  copiable = false,
}) => {
  return (
    <View className="flex-row w-full justify-between items-center px-3 py-3">
      <View className="flex-col w-1/2">
        <Text className="text-small text-ink-darkest dark:text-sky-lightest">{leftText}</Text>
        {leftCaption && <Text className="text-tiny text-ink-lighter">{leftCaption}</Text>}
      </View>

      <View className="flex-col w-1/2">
        <SingleClickTouchableOpacity
          disabled={!copiable}
          onPress={() => {
            Clipboard.setStringAsync(rightText);
          }}>
          <Text className="text-small text-ink-darkest dark:text-sky-lightest text-right">
            {rightText}
          </Text>
        </SingleClickTouchableOpacity>

        {rightCaption && (
          <Text className="text-tiny text-ink-lighter text-right">{rightCaption}</Text>
        )}
      </View>
    </View>
  );
};

export default OptionsBar;
