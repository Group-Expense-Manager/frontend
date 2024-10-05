import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import FilledActivityHistoryListItem from '@/components/modules/activity/FilledActivityHistoryListItem';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import useExpense from '@/hooks/expense/UseExpense';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';

export default function ExpenseHistory() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const { authState, userData } = useContext(GlobalContext);

  const { data: expense } = useExpense(params.expenseId);
  const { data: groupMemberDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    expense?.creatorId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Expense history')} />,
    });
  }, [navigation]);

  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <Box>
      {expense && groupMemberDetails ? (
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}>
          {expense.history.map((entry, index) => (
            <View key={index}>
              <FilledActivityHistoryListItem
                historyEntry={{ ...entry, activityAction: entry.expenseAction }}
                groupId={userData.currentGroupId!}
                activityType="EXPENSE"
                position={authState.userId === entry.participantId ? 'right' : 'left'}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Loader />
      )}
    </Box>
  );
}
