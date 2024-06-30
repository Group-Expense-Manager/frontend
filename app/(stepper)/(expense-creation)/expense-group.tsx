import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, SelectList } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useGroups, { Group } from '@/hooks/group/UseGroups';

export default function ExpenseGroup() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const { data } = useGroups();
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  function mapToSelectList() {
    if (data) {
      return data.groups.map((group: Group) => ({
        key: group.groupId,
        value: group.name,
      }));
    }
    return [];
  }

  useEffect(() => {
    setExpenseCreationProps({
      groupId: selectedGroupId,
      title: expenseCreationProps.title,
      cost: expenseCreationProps.cost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: expenseCreationProps.expenseParticipants,
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [selectedGroupId]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <View>
              <SelectList
                name={t('Select group')}
                setSelected={setSelectedGroupId}
                data={mapToSelectList()}
                key="code"
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-title')}
                title={t('Next')}
              />
            </View>
            <View className="w-full">
              <CustomButton onPress={() => router.navigate('(tabs)/create')} title={t('Cancel')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
