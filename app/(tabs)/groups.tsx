import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components';
import SafeView from '@/components/SafeView';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupContext } from '@/context/GroupContext';
import useExpenses from '@/hooks/expense/UseExpenses';
import useGroups, { Group } from '@/hooks/group/UseGroups';
export default function Groups() {
  const { t } = useTranslation();
  const { status, data, error, isFetching } = useGroups();
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const {
    data: expensesData,
    status: expensesStatus,
    isFetching: isFetchingExpenses,
  } = useExpenses(currentGroupId);
  const { currentGroupId: cgid, setCurrentGroupId: setCgid } = useContext(GlobalContext);

  function getNameById(id: string, items: Group[]): string | undefined {
    const item = items.find((item) => item.groupId === id);
    return item ? item.name : undefined;
  }

  useEffect(() => {
    if (data && data.groups.length > 0) {
      setGroups(data.groups);
      console.log(data.groups.length);

      setCgid(data.groups[0].groupId);
      setCurrentGroupId(data.groups[0].groupId);
    }
  }, [data]);

  useEffect(() => {
    console.log(expensesStatus);
  }, [expensesStatus]);

  useEffect(() => {
    console.log(`current group id: ${cgid}`);
  }, [cgid]);

  return (
    <SafeView>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : groups.length === 0 ? (
        <>
          <Text className="text-title2">{t("You don't belong to any group!")}</Text>
          <View className="py-[200px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.push('(stepper)/(group-creation)/group-name')}
                title={t('Create new group')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.push('(popover)/(join-group)/join-group')}
                title={t('Join existing group')}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <Text className="text-title1">{getNameById(currentGroupId!, groups)}</Text>
          {isFetchingExpenses ? (
            <Text>Loading Expenses...</Text>
          ) : expensesData?.expenses.length === 0 ? (
            <Text>{t('No expenses')}</Text>
          ) : (
            <ScrollView className="mt-10">
              {expensesData?.expenses.map((expense) => (
                <TouchableOpacity
                  onPress={() => router.push(`expenses/${expense.expenseId}`)}
                  key={expense.expenseId}
                  className="border p-5 flex-row justify-between">
                  <Text>{expense.title}</Text>
                  <Text>Status: {expense.status}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </SafeView>
  );
}
