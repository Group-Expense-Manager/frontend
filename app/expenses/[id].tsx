import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlobalContext } from '@/context/GlobalContext';
import { GroupContext } from '@/context/GroupContext';
import useExpense, { ExpenseParticipant } from '@/hooks/expense/UseExpense';
import useExpenses from '@/hooks/expense/UseExpenses';

export default function Expense() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const { authState, currentGroupId } = useContext(GlobalContext);
  const { data, status, isFetching } = useExpense(id as string, currentGroupId);

  useEffect(() => {
    console.log(`current group id: ${currentGroupId}`);
  }, [currentGroupId]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const renderParticipant = ({ item }: { item: ExpenseParticipant }) => (
    <View>
      <Text>Participant ID: {item.participantId}</Text>
      <Text>Cost: {item.participantCost}</Text>
      <Text>Status: {item.participantStatus}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 justify-center">
      {isFetching ? (
        <Text className="text-center">Loading...</Text>
      ) : (
        <View>
          <Text className="font-bold">Expense Details</Text>
          {data?.title && <Text>Title: {data.title}</Text>}
          {data?.cost && <Text className="font-bold">Cost: {data?.cost}</Text>}
          {data?.baseCurrency && <Text>Base Currency: {data.baseCurrency}</Text>}
          {data?.status && <Text className="font-bold">Status: {data.status}</Text>}
          {data?.creatorId && <Text>Creator ID: {data.creatorId}</Text>}
          <FlatList
            data={data?.expenseParticipants}
            renderItem={renderParticipant}
            keyExtractor={(item) => item.participantId}
            ListHeaderComponent={<Text className="font-bold">Participants</Text>}
          />
          <Text className="font-bold">Status History</Text>
          {data?.statusHistory.map((history, index) => (
            <View key={index}>
              {/*{history.createdAt && <Text>Created At: {history.createdAt.toDateString()}</Text>}*/}
              {history.expenseAction && <Text>Action: {history.expenseAction}</Text>}
              {history.comment && <Text>Comment: {history.comment}</Text>}
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
