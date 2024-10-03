import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View } from 'react-native';

import { CustomButton, FullViewLoader } from '@/components';
import Box from '@/components/ui/box/Box';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GroupCreationContext } from '@/context/group/GroupCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useCreateGroup from '@/hooks/group/UseCreateGroup';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function CreateGroupCurrencies() {
  const { t } = useTranslation();
  const { groupCreation, setGroupCreation } = useContext(GroupCreationContext);

  const { mutate: createGroup, isPending: isGroupCreationPending } = useCreateGroup();

  const [selectedGroupCurrencies, setSelectedGroupCurrencies] = useState<SelectInputData<Currency>>(
    {
      value: groupCreation.groupCurrencies[0],
      name: groupCreation.groupCurrencies[0].code,
    },
  );

  const isNextButtonDisabled = !groupCreation.groupCurrencies.length;

  function setGroupCurrencies(currency: Currency) {
    setSelectedGroupCurrencies({ value: currency, name: currency.code });
    setGroupCreation({ ...groupCreation, groupCurrencies: [currency] });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isGroupCreationPending,
    );
    return () => backHandler.remove();
  }, [isGroupCreationPending]);

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <FullViewLoader isLoading={isGroupCreationPending} />
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <SelectInput
              onSelect={setGroupCurrencies}
              onPress={() => router.navigate('/groups/new/group-currencies-select')}
              label={t('Group currencies')}
              value={selectedGroupCurrencies}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={createGroup}
              title={t('Create group')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
