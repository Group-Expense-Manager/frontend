import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface SegmentProps {
  text: string;
  onPress: () => void;
}

interface SegmentedControlsProps {
  segments: SegmentProps[];
}

const SegmentedControls: React.FC<SegmentedControlsProps> = ({ segments }) => {
  const [activeSegmentIndex, setActiveSegment] = useState(0);

  function backgroundColor(index: number) {
    return index === activeSegmentIndex ? 'bg-primary-lighter dark:bg-primary-dark' : '';
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
        <TouchableOpacity
          key={`${index.toString()}-segment`}
          activeOpacity={1}
          onPress={() => {
            if (activeSegmentIndex !== index) {
              setActiveSegment(index);
              segment.onPress();
            }
          }}
          className={`${backgroundColor(index)} flex-1 justify-center rounded-[6px] h-7`}>
          <Text className={`text-center ${textColor(index)}`}>{segment.text}</Text>
          {hasSeparator(index) && (
            <View className="bg-sky-base dark:bg-ink-base w-[1px] h-5 absolute -right-[0.5px]" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SegmentedControls;
