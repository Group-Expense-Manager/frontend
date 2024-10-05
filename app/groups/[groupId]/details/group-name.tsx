import { router, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { GroupUpdateContext } from '@/context/group/GroupUpdateContext';
import { Validator } from '@/util/Validator';

export default function GroupName() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { groupUpdate, setGroupUpdate } = useContext(GroupUpdateContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.trim().length > 0;
      },
      errorMessage: t('Group name can not be empty'),
    },
    {
      rule(arg: string) {
        return arg.length <= 20;
      },
      errorMessage: t('Group name may contain at most 20 characters'),
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => <CustomHeader title={t('Group data')} />,
    });
  }, [navigation]);

  return (
    <Box>
      <View className="w-full flex-col space-y-[28px] items-center">
        <CustomImage image={groupUpdate.groupPicture} size="colossal" />
        <View className="w-full">
          <MultiTextInput
            label={t('Group name')}
            value={groupUpdate.groupName}
            onChangeText={(groupName) =>
              setGroupUpdate({
                ...groupUpdate,
                groupName,
                isValidGroupName: validator.validate(groupName).length === 0,
              })
            }
            autoFocus
            onBlur={() => router.back()}
            errorMessages={validator.validate(groupUpdate.groupName)}
          />
        </View>
      </View>
    </Box>
  );
}
