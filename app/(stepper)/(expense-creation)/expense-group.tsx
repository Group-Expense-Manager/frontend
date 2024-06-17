import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectList } from '@/components';
import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';
import useGroups, { Group, Groups } from '@/hooks/group/UseGroups';

export default function ExpenseGroup() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const { status, data, error, isFetching } = useGroups();
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

  return (
    <SafeAreaView className="flex-1 justify-center">
      <SelectList
        name={t('Select group')}
        setSelected={setSelectedGroupId}
        data={mapToSelectList()}
      />
      <Button
        title={t('Next')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-title')}
      />
      <Button title={t('Cancel')} onPress={() => router.navigate('(tabs)/create')} />
    </SafeAreaView>
  );
}
