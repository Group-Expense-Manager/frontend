import { router } from 'expo-router';
import exp from 'node:constants';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectList } from '@/components';
import MultipleSelectList from '@/components/MultipleSelectList';
import { ExpenseCreationContext, ExpenseParticipant } from '@/context/ExpenseCreationContext';
import useGroup, { Currency, Member } from '@/hooks/group/UseGroup';

export default function ExpenseParticipants() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const { status, data, error, isFetching } = useGroup(expenseCreationProps.groupId);
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

  const names = ['Jakub', 'Jan', 'Paweł', 'Anna', 'Marcin', 'Kamil', 'Zofia', 'Piotr', 'Marta'];

  function getUserName(id: string) {
    return names[id.charCodeAt(0) % names.length];
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
    <SafeAreaView className="flex-1 justify-center">
      <MultipleSelectList
        name={t('Select participants')}
        setSelected={setSelectedParticipantsIds}
        data={mapToSelectList()}
        label={t('Select participants')}
      />
      <Button
        title={t('Next')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost-division')}
      />
      <Button
        title={t('Back')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost')}
      />
    </SafeAreaView>
  );
}
