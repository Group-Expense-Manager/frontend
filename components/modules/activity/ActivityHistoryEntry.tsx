import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';

interface ActivityHistoryEntryProps {
  activityAction: 'created' | 'updated' | 'deleted' | 'accepted' | 'rejected';
  activityType: 'expense' | 'payment';
  position: 'left' | 'right';
  imageUri: string;
  username: string;
  date: Date;
  message?: string;
}

const ActivityHistoryEntry: React.FC<ActivityHistoryEntryProps> = ({
  activityAction,
  activityType,
  position,
  imageUri,
  username,
  date,
  message,
}) => {
  const { t } = useTranslation();

  const flexRow = position === 'left' ? 'flex-row' : 'flex-row-reverse';
  const items = position === 'left' ? 'items-start' : 'items-end';
  const justify = position === 'left' ? '' : 'justify-end';

  const formatDate = () => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
  };

  return (
    <View className={`p-[10px] w-full ${flexRow}`}>
      <View className="justify-end">
        <CustomImage imageUri={imageUri} size="medium" />
      </View>
      <View className="w-[10px]" />
      <View className={`flex-col ${items} flex-1`}>
        <View className={` w-[90%] flex-row ${justify}`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-tiny text-ink-darkest dark:text-sky-lightest max-w-[65%]">
            {username}
          </Text>
          <View className="w-[8px]" />
          <Text className="text-tiny text-ink-lighter">{formatDate()}</Text>
        </View>
        <View className="rounded-[12px] bg-primary-base dark:bg-primary-dark px-[10px] py-[3px] max-w-[90%] items-start">
          <Text className="text-sky-lightest font-bold">
            {`${t(activityAction)} ${t(activityType)}`.toUpperCase()}
          </Text>
          {message && <Text className=" text-sky-lightest">{message}</Text>}
        </View>
      </View>
    </View>
  );
};

export default ActivityHistoryEntry;
