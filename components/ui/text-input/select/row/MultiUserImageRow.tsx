import React from 'react';
import { Text, View } from 'react-native';

import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import CustomImage from '@/components/ui/image/CustomImage';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';

interface MultiUserRowProps {
  item: SelectInputData<GroupMemberDetails>;
  selected: boolean;
}

const MultiUserImageRow: React.FC<MultiUserRowProps> = ({ item, selected }) => {
  const { data: profilePicture } = useProfilePicture(item.value.id, item.value.attachmentId);

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
        <CustomCheckbox value={selected} disabled={item.isDisabled} />
      </View>
    </View>
  );
};

export default MultiUserImageRow;
