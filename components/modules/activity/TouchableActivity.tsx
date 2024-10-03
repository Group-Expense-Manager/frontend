import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import theme from '@/constants/Colors';
import { ArrowNarrowRight, CheckCircleIcon, HelpCircleIcon, XCircleIcon } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

interface TouchableActivityProps {
  type: 'EXPENSE' | 'PAYMENT';
  creatorName: string;
  creatorPicture?: ImageBase64;
  title: string;
  value: number;
  currency: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  participantPictures: (ImageBase64 | undefined)[];
  date: string;
  onPress: () => void;
}

const TouchableActivity: React.FC<TouchableActivityProps> = ({
  type,
  creatorName,
  creatorPicture,
  title,
  value,
  currency,
  status,
  participantPictures,
  date,
  onPress,
}) => {
  const { colorScheme } = useColorScheme();
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const selectIcon = () => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <CheckCircleIcon
            stroke={theme.green.dark}
            width={IconSize.SMALL}
            height={IconSize.SMALL}
          />
        );
      case 'PENDING':
        return (
          <HelpCircleIcon
            stroke={theme.yellow.base}
            width={IconSize.SMALL}
            height={IconSize.SMALL}
          />
        );
      case 'REJECTED':
        return (
          <XCircleIcon stroke={theme.red.dark} width={IconSize.SMALL} height={IconSize.SMALL} />
        );
    }
  };

  const valueAsString = value.toString().replace('.', ',');

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-primary-lightest dark:bg-ink-base rounded-lg flex-col px-2 py-1 space-y-1">
      <View className="flex-row w-full items-center justify-between space-x-2">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="flex-1 font-bold text-regular text-ink-darkest dark:text-sky-lightest">
          {title}
        </Text>
        {selectIcon()}
      </View>
      <View className="flex-row justify-between space-x-2">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-normal flex-1 text-tiny text-ink-darkest dark:text-sky-lightest">
          {`${creatorName}`}
        </Text>
        <View>
          <Text className="font-normal text-tiny text-ink-darkest dark:text-sky-lightest">
            {formatDate(new Date(date))}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center space-x-4">
        {type === 'EXPENSE' ? (
          <View className="flex-1">
            <ScrollView
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-1">
              <View className="flex-row  space-x-1 flex-1" onStartShouldSetResponder={() => true}>
                {[creatorPicture, ...participantPictures].map((picture, index) => (
                  <View key={index}>
                    <CustomImage size="tiny" image={picture} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View className="flex-row space-x-1">
            <View>
              <CustomImage size="tiny" image={creatorPicture} />
            </View>
            <View>
              <ArrowNarrowRight
                stroke={colorScheme === 'light' ? theme.ink.darkest : theme.sky.lightest}
                width={IconSize.SMALL}
                height={IconSize.SMALL}
              />
            </View>
            <View>
              <CustomImage size="tiny" image={participantPictures[0]} />
            </View>
          </View>
        )}

        <View className="max-w-[50%]">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-bold text-regular text-ink-darkest dark:text-sky-lightest text-right">
            {`${valueAsString} ${currency}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TouchableActivity;
