import { router } from 'expo-router';
import exp from 'node:constants';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput, SelectList } from '@/components';
import MultipleSelectList from '@/components/MultipleSelectList';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext, ExpenseParticipant } from '@/context/ExpenseCreationContext';
import useGroup, { Currency, Member } from '@/hooks/group/UseGroup';

export default function ExpenseParticipants() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const { data, error, isFetching } = useGroup(expenseCreationProps.groupId);
  const [selectedParticipantsIds, setSelectedParticipantsIds] = useState<string[]>([]);
  function mapToSelectList() {
    if (data) {
      return data.members.map((member: Member) => ({
        key: member.userId,
        value: getUserName(member.userId),
      }));
    }
    return [];
  }

  const names = [
    'Jakub',
    'Jan',
    'Paweł',
    'Anna',
    'Marcin',
    'Kamil',
    'Zofia',
    'Piotr',
    'Marta',
    'Adam',
    'Artur',
    'Dominik',
    'Emil',
    'Filip',
    'Grzegorz',
    'Hubert',
    'Krzysztof',
    'Łukasz',
    'Mikołaj',
    'Agnieszka',
    'Barbara',
    'Dorota',
    'Ewa',
    'Gabriela',
    'Halina',
    'Irena',
    'Jadwiga',
    'Katarzyna',
    'Lidia',
  ];

  function getUserName(id: string) {
    return names[(id.charCodeAt(0) + id.charCodeAt(1)) % names.length];
  }

  useEffect(() => {
    if (selectedParticipantsIds) {
      setExpenseCreationProps({
        groupId: expenseCreationProps.groupId,
        title: expenseCreationProps.title,
        cost: expenseCreationProps.cost,
        baseCurrency: expenseCreationProps.baseCurrency,
        targetCurrency: expenseCreationProps.targetCurrency,
        expenseDate: expenseCreationProps.expenseDate,
        expenseParticipants: mapToExpenseParticipants(selectedParticipantsIds),
        message: expenseCreationProps.message,
        attachmentId: expenseCreationProps.attachmentId,
      });
    }
  }, [selectedParticipantsIds]);

  function mapToExpenseParticipants(ids: string[]): ExpenseParticipant[] {
    return selectedParticipantsIds.map((id) => ({
      participantId: id,
      participantCost: 0,
    }));
  }

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
              <MultipleSelectList
                name={t('Select participants')}
                setSelected={setSelectedParticipantsIds}
                data={mapToSelectList()}
                label={t('Select participants')}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                title={t('Next')}
                onPress={() =>
                  router.navigate('(stepper)/(expense-creation)/expense-cost-division')
                }
              />
            </View>
            <View className="w-full">
              <CustomButton
                title={t('Back')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
