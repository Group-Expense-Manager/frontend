import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import theme from '@/constants/Colors';
import { UserIcon, XCircleIcon } from '@/constants/Icon';

interface TouchableExpenseProps {
  key: string;
  title: string;
  author: string;
  value: string;
  date: string;
  onPress: () => void;
}

const TouchableExpense: React.FC<TouchableExpenseProps> = ({
  title,
  value,
  author,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-primary-lightest border-[3px] border-primary-base rounded-[10px]">
      <View className="flex flex-col p-[10px] space-y-[5px]">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <Text className="font-bold text-large text-ink-darkest pr-[5px]">{title}</Text>
            <XCircleIcon stroke={theme.red.base} width="24px" height="24px" />
          </View>
          <View>
            <Text className="font-normal text-large text-ink-darkest">{value}</Text>
          </View>
        </View>
        <View>
          <Text className="font-normal text-tiny text-ink-darkest">Jan Kowalski</Text>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row space-x-[5px]">
            <UserIcon width="24px" height="24px" />
            <UserIcon width="24px" height="24px" />
            <UserIcon width="24px" height="24px" />
          </View>
          <View>
            <Text className="font-normal text-small text-ink-darkest">
              {new Date(date).toDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TouchableExpense;
