import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { CustomButton, TouchableExpense } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { GlobalContext } from '@/context/GlobalContext';
import useExpenses from '@/hooks/expense/UseExpenses';
import useGroups, { Group } from '@/hooks/group/UseGroups';

export default function Groups() {
  const { t } = useTranslation();
  const { data, isFetching } = useGroups();
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const { data: expensesData, isFetching: isFetchingExpenses } = useExpenses(currentGroupId);
  const { userData, setUserData } = useContext(GlobalContext);

  function getNameById(id: string, items: Group[]): string | undefined {
    const item = items.find((item) => item.groupId === id);
    return item ? item.name : undefined;
  }

  useEffect(() => {
    if (data && data.groups.length > 0) {
      setGroups(data.groups);
      setUserData({ ...userData, currentGroupId: data.groups[0].groupId });
      setCurrentGroupId(data.groups[0].groupId);
    }
  }, [data]);

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
            <ScrollView className="mt-10 flex flex-col space-y-[10px]">
              {expensesData?.expenses.map((expense) => (
                <View key={expense.expenseId}>
                  <TouchableExpense
                    key={expense.expenseId}
                    title={expense.title}
                    date={expense.expenseDate}
                    value={`${expense.cost} ${expense.baseCurrency}`}
                    onPress={() => router.push(`expenses/${expense.expenseId}`)}
                    author={expense.creatorId}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </SafeView>
  );
}
