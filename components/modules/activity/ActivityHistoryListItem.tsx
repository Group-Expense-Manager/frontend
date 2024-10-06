import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import { formatToDayMonthTime } from '@/util/DateUtils';

interface ActivityHistoryListItemProps {
  activityAction: 'CREATED' | 'EDITED' | 'DELETED' | 'ACCEPTED' | 'REJECTED';
  activityType: 'EXPENSE' | 'PAYMENT';
  position: 'left' | 'right';
  image?: ImageBase64;
  username: string;
  date: string;
  message?: string;
}

const ActivityHistoryListItem: React.FC<ActivityHistoryListItemProps> = ({
  activityAction,
  activityType,
  position,
  image,
  username,
  date,
  message,
}) => {
  const { t } = useTranslation();

  const flexRow = position === 'left' ? 'flex-row' : 'flex-row-reverse';
  const items = position === 'left' ? 'items-start' : 'items-end';
  const justify = position === 'left' ? '' : 'justify-end';

  return (
    <View className={`p-[10px] w-full ${flexRow}`}>
      <View className="justify-end">
        <CustomImage image={image} size="small" />
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
          <Text className="text-tiny text-ink-lighter">{formatToDayMonthTime(new Date(date))}</Text>
        </View>
        <View className="rounded-[12px] bg-primary-base dark:bg-primary-dark px-[10px] py-[3px] max-w-[90%] items-start">
          <Text className="text-sky-lightest font-bold">
            {`${t(activityAction)} ${t(activityType)}`}
          </Text>
          {message && <Text className=" text-sky-lightest">{message}</Text>}
        </View>
      </View>
    </View>
  );
};

export default ActivityHistoryListItem;
