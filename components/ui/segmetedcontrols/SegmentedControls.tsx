import React from 'react';
import { Text, View } from 'react-native';

import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';

export interface SegmentProps {
  text: string;
  onPress: () => void;
}

interface SegmentedControlsProps {
  activeSegmentIndex: number;
  onValueChange: (activeSegmentIndex: number) => void;
  segments: SegmentProps[];
}

const SegmentedControls: React.FC<SegmentedControlsProps> = ({
  activeSegmentIndex,
  onValueChange,
  segments,
}) => {
  function backgroundColor(index: number) {
    return index === activeSegmentIndex ? 'bg-primary-lighter dark:bg-primary-base' : '';
  }

  function textColor(index: number) {
    return index === activeSegmentIndex
      ? 'text-ink-darkest dark:text-sky-lightest'
      : 'text-ink-light dark:text-sky-dark';
  }

  function hasSeparator(index: number) {
    return (
      index !== segments.length - 1 &&
      index !== activeSegmentIndex &&
      index + 1 !== activeSegmentIndex
    );
  }

  return (
    <View className="w-full rounded-[8px] p-0.5 flex-row bg-sky-lighter dark:bg-ink-darker items-center">
      {segments.map((segment, index) => (
        <SingleClickTouchableOpacity
          delay={500}
          key={`${index.toString()}-segment`}
          activeOpacity={1}
          onPress={() => {
            if (activeSegmentIndex !== index) {
              onValueChange(index);
              segment.onPress();
            }
          }}
          className={`${backgroundColor(index)} flex-1 justify-center rounded-[6px] h-7`}>
          <Text className={`text-center ${textColor(index)}`}>{segment.text}</Text>
          {hasSeparator(index) && (
            <View className="bg-sky-base dark:bg-ink-base w-[1px] h-5 absolute -right-[0.5px]" />
          )}
        </SingleClickTouchableOpacity>
      ))}
    </View>
  );
};

export default SegmentedControls;
