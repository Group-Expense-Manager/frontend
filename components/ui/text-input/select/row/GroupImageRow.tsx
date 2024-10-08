import React from 'react';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import { Group } from '@/hooks/group/UseGroups';

interface GroupImageRowProps {
  item: SelectInputData<Group>;
  selected: boolean;
}

const GroupImageRow: React.FC<GroupImageRowProps> = ({ item, selected }) => {
  const { data: profilePicture } = useGroupPicture(item.value.groupId, item.value.attachmentId);

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center justify-between">
        <View className="text-left font-regular text-ink-lighter dark:text-sky-dark mr-4">
          <CustomImage image={profilePicture} size="medium" />
        </View>
        <Text className="text-regular text-ink-darkest dark:text-sky-lightest font-regular text-left">
          {item.name}
        </Text>
      </View>
      <View className="items-center justify-center">
        <CustomRadioButton value={selected} />
      </View>
    </View>
  );
};

export default GroupImageRow;
