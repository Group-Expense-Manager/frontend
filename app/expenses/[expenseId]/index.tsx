import Decimal from 'decimal.js';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import ActivityAttachment from '@/components/modules/activity/ActivityAttachment';
import Participant from '@/components/modules/activity/Participant';
import NavBar from '@/components/ui/bar/NavBar';
import OptionsBar from '@/components/ui/bar/OptionsBar';
import Box from '@/components/ui/box/Box';
import CustomButton, { ButtonColor } from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import useExpense, { Expense, ExpenseParticipant } from '@/hooks/expense/UseExpense';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';
import { formatToDayMonthYear } from '@/util/DateUtils';
import { getNameFromUserDetails } from '@/util/GetName';
import { numberToString } from '@/util/StringUtils';

export default function ExpenseView() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const { authState, userData } = useContext(GlobalContext);

  const { data: expense } = useExpense(params.expenseId);
  const { data: groupMemberDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    expense?.creatorId,
  );

  const creatorAsParticipant = (
    expense: Expense,
    multiplier: number,
    participants: ExpenseParticipant[],
  ): ExpenseParticipant => {
    return {
      participantId: expense?.creatorId,
      participantCost: new Decimal(expense.amount.value)
        .times(multiplier)
        .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        .minus(
          new Decimal(
            participants.reduce(
              (accumulator, currentValue) =>
                accumulator.add(new Decimal(currentValue.participantCost)),
              new Decimal(0),
            ),
          ),
        )
        .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        .toNumber(),
      participantStatus: 'ACCEPTED',
    };
  };

  function getParticipants(expense: Expense): ExpenseParticipant[] {
    const multiplier = expense.fxData?.exchangeRate ?? 1;
    const participants = expense?.expenseParticipants.map((participant) => ({
      ...participant,
      participantCost: new Decimal(participant.participantCost)
        .times(multiplier)
        .toDecimalPlaces(2, Decimal.ROUND_DOWN)
        .toNumber(),
    }));
    return [creatorAsParticipant(expense, multiplier, participants), ...participants];
  }

  const role = () => {
    switch (true) {
      case !!expense && authState.userId === expense.creatorId:
        return 'creator';
      case !!expense &&
        expense.expenseParticipants
          .map((participant) => participant.participantId)
          .includes(authState.userId!):
        return 'participant';
      default:
        return 'other';
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Expense')} />,
    });
  }, [navigation, role()]);

  return (
    <Box>
      {expense && groupMemberDetails ? (
        <ScrollView className="space-y-3" showsVerticalScrollIndicator={false}>
          <View className="space-y-2">
            <NavBar type="segment" title={t('Details')} />
            <View>
              <OptionsBar
                leftText={t('Author')}
                rightText={getNameFromUserDetails(groupMemberDetails)}
              />
              <OptionsBar leftText={t('Title')} rightText={expense.title} />
              <OptionsBar
                leftText={t('Cost')}
                rightText={`${numberToString(expense.amount.value)} ${expense.amount.currency}`}
              />
              {expense?.fxData && (
                <OptionsBar
                  leftText={t('Cost after exchange rate conversion')}
                  rightText={`${numberToString(new Decimal(expense.amount.value).times(expense.fxData.exchangeRate).toDecimalPlaces(2, Decimal.ROUND_DOWN))} ${expense.fxData.targetCurrency}`}
                />
              )}
              <OptionsBar
                leftText={t('Expense date')}
                rightText={formatToDayMonthYear(new Date(expense.expenseDate))}
              />
            </View>
          </View>

          <View className="space-y-2">
            <NavBar type="segment" title={t('Members')} />
            <View className="space-y-2">
              {getParticipants(expense).map((participant, index) => (
                <View key={index}>
                  <Participant
                    participant={participant}
                    currency={expense.fxData?.targetCurrency ?? expense.amount.currency}
                    groupId={userData.currentGroupId!}
                  />
                </View>
              ))}
            </View>
          </View>

          {expense.attachmentId && (
            <View className="space-y-2">
              <NavBar title={t('Attachment')} type="segment" />
              <View>
                <ActivityAttachment
                  groupId={userData.currentGroupId!}
                  attachmentId={expense.attachmentId}
                />
              </View>
            </View>
          )}
          <View className="space-y-2 pb-8">
            <NavBar title={t('Actions')} type="segment" />
            <View className="space-y-4">
              {role() === 'participant' && (
                <View>
                  <CustomButton
                    title={t('Decide')}
                    onPress={() => router.push(`/expenses/${params.expenseId}/decide-modal`)}
                  />
                </View>
              )}

              <View>
                <CustomButton
                  title={t('Show expense history')}
                  onPress={() => router.push(`/expenses/${params.expenseId}/history`)}
                />
              </View>
              {role() === 'creator' && (
                <View>
                  <CustomButton title={t('Edit expense')} onPress={() => {}} />
                </View>
              )}
              {role() === 'creator' && (
                <View>
                  <CustomButton
                    title={t('Delete expense')}
                    onPress={() =>
                      router.push(`/expenses/${params.expenseId}/delete-expense-modal`)
                    }
                    type={ButtonType.OUTLINED}
                    color={ButtonColor.RED}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center w-full">
          <Loader />
        </View>
      )}
    </Box>
  );
}
