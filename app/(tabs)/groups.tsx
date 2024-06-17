import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupContext } from '@/context/GroupContext';
import useExpenses from '@/hooks/expense/UseExpenses';
import useGroups, { Group } from '@/hooks/group/UseGroups';
export default function Groups() {
  const { t } = useTranslation();
  const { status, data, error, isFetching } = useGroups();
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const { data: expenseData, status: expenseStatus } = useExpenses(currentGroupId);

  function getNameById(id: string, items: Group[]): string | undefined {
    const item = items.find((item) => item.groupId === id);
    return item ? item.name : undefined;
  }

  useEffect(() => {
    if (data && data.groups.length > 0) {
      setGroups(data.groups);
      console.log(data.groups.length);

      setCurrentGroupId(data.groups[0].groupId);
    }
  }, [data]);

  useEffect(() => {
    console.log(expenseStatus);
  }, [expenseStatus]);

  return (
    <SafeAreaView className="flex-1 h-full justify-center">
      {isFetching ? (
        <Text>Loading...</Text>
      ) : groups.length === 0 ? (
        <>
          <Text className="text-title2">{t("You don't belong to any group!")}</Text>
          <Button
            title={t('Create new group')}
            onPress={() => router.push('(stepper)/(group-creation)/group-name')}
          />
          <Button
            title={t('Join existing group')}
            onPress={() => router.push('(popover)/(join-group)/join-group')}
          />
        </>
      ) : (
        <>
          <Text className="text-title1">{getNameById(currentGroupId!, groups)}</Text>
          {expenseStatus === 'pending' ? (
            <Text>Loading Expenses...</Text>
          ) : expenseStatus === 'error' ? (
            <Text>No expenses</Text>
          ) : (
            <Text>No expenses</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
