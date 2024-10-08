import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import GroupSelectInput from '@/components/ui/text-input/select/GroupSelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useGroups, { Group } from '@/hooks/group/UseGroups';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseGroup() {
  const { t } = useTranslation();

  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);

  const { userData } = useContext(GlobalContext);

  const { data: groups } = useGroups();

  const [selectedGroup, setSelectedGroup] = useState<Group>({
    groupId: '',
    name: '',
    ownerId: '',
    attachmentId: '',
  });

  const groupsList = () => {
    return groups?.map((group) => {
      return { value: group, name: group.name };
    });
  };

  useEffect(() => {
    if (groups && !selectedGroup.name) {
      const selected = groups.find((group) => group.groupId === userData.currentGroupId);
      if (selected) {
        setSelectedGroup(selected);
        setExpenseCreation({
          ...expenseCreation,
          groupId: selected.groupId,
        });
      }
    }
  }, [groups]);

  function setGroup(group: Group) {
    if (group.groupId !== expenseCreation.groupId) {
      setSelectedGroup(group);
      setExpenseCreation({
        ...expenseCreation,
        groupId: group.groupId,
        baseCurrency: { code: '' },
        targetCurrency: undefined,
        expenseParticipants: [],
      });
    }
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            {groups ? (
              <GroupSelectInput
                onSelect={setGroup}
                onPress={() => router.navigate('/expenses/new/group-select')}
                label={t('Expense group')}
                value={selectedGroup}
                data={groupsList()}
              />
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/expenses/new/title')}
              title={t('Next')}
              disabled={!expenseCreation.groupId}
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
