import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { GroupCreationContext } from '@/context/group/GroupCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function CreateGroupName() {
  const { t } = useTranslation();
  const { groupCreation, setGroupCreation } = useContext(GroupCreationContext);
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

  const isNextButtonDisabled = validator.validate(groupCreation.name).length !== 0;

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Group name')}
              onChangeText={(name: string) => setGroupCreation({ ...groupCreation, name })}
              value={groupCreation.name}
              errorMessages={
                groupCreation.name === '' ? [] : validator.validate(groupCreation.name)
              }
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/groups/new/group-currencies')}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Cancel')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
