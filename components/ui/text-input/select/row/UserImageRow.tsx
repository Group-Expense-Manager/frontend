import React from 'react';
import { Text, View } from 'react-native';

import CustomImage from '@/components/ui/image/CustomImage';
import CustomRadioButton from '@/components/ui/radio-button/CustomRadioButton';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';

interface UserRowProps {
  item: SelectInputData<GroupMemberDetails>;
  selected: boolean;
}

const UserImageRow: React.FC<UserRowProps> = ({ item, selected }) => {
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
        <CustomRadioButton value={selected} />
      </View>
    </View>
  );
};

export default UserImageRow;
