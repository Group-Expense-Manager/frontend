import Decimal from 'decimal.js';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton } from '@/components';
import ActivityAttachment from '@/components/modules/activity/ActivityAttachment';
import Participant from '@/components/modules/activity/Participant';
import NavBar from '@/components/ui/bar/NavBar';
import OptionsBar from '@/components/ui/bar/OptionsBar';
import Box from '@/components/ui/box/Box';
import { ButtonColor } from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { EditIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useExpense, { Expense, ExpenseParticipant } from '@/hooks/expense/UseExpense';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';
import { formatToDayMonthYear } from '@/util/DateUtils';
import { getNameFromUserDetails } from '@/util/GetName';

export default function ExpenseView() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const { authState, userData } = useContext(GlobalContext);
  const [currentY, setCurrentY] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const { data: expense } = useExpense(params.expenseId);
  const { data: groupMemberDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    expense?.creatorId,
  );

  const creatorAsParticipant = (expense: Expense): ExpenseParticipant => {
    return {
      participantId: expense?.creatorId,
      participantCost: new Decimal(expense.totalCost)
        .minus(
          new Decimal(
            expense?.expenseParticipants.reduce(
              (accumulator, currentValue) => accumulator.add(currentValue.participantCost),
              new Decimal(0),
            ),
          ),
        )
        .toDecimalPlaces(2, Decimal.rounding)
        .toNumber(),
      participantStatus: 'ACCEPTED',
    };
  };

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
      header: () => (
        <CustomHeader
          title={t('Expense')}
          rightIcon={role() === 'creator' ? <EditIcon /> : undefined}
          onRightIconPress={role() === 'creator' ? () => {} : undefined}
        />
      ),
    });
  }, [navigation, role()]);

  return (
    <Box>
      {expense && groupMemberDetails ? (
        <ScrollView
          onScroll={(event) => {
            setCurrentY(event.nativeEvent.contentOffset.y);
          }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollTo({ y: currentY, animated: false })
          }
          ref={scrollViewRef}
          className="space-y-3"
          showsVerticalScrollIndicator={false}>
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
                rightText={`${expense.totalCost} ${expense.baseCurrency}`}
              />
              {expense?.targetCurrency && expense?.exchangeRate && (
                <OptionsBar
                  leftText={t('Cost after exchange rate conversion')}
                  rightText={`${new Decimal(expense.totalCost).times(expense.exchangeRate).toDecimalPlaces(2, Decimal.ROUND_DOWN)} ${expense.targetCurrency}`}
                />
              )}
              <OptionsBar
                leftText={t('Date of expense')}
                rightText={formatToDayMonthYear(new Date(expense.expenseDate))}
              />
            </View>
          </View>

          <View className="space-y-2">
            <NavBar type="segment" title={t('Members')} />
            <View className="space-y-2">
              {[creatorAsParticipant(expense), ...expense.expenseParticipants].map(
                (participant, index) => (
                  <View key={index}>
                    <Participant
                      participant={participant}
                      currency={expense.baseCurrency}
                      groupId={userData.currentGroupId!}
                    />
                  </View>
                ),
              )}
            </View>
          </View>

          <View className="space-y-2">
            <NavBar title={t('Attachment')} type="segment" />
            <View>
              <ActivityAttachment
                groupId={userData.currentGroupId!}
                attachmentId={expense.attachmentId}
              />
            </View>
          </View>
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
