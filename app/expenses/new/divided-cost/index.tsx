import Decimal from 'decimal.js';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { CustomButton } from '@/components';
import UserCost from '@/components/modules/expense/UserCost';
import NavBar from '@/components/ui/bar/NavBar';
import Box from '@/components/ui/box/Box';
import Loader from '@/components/ui/loader/Loader';
import SegmentedControls from '@/components/ui/segmetedcontrols/SegmentedControls';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useGroupMembersDetails from '@/hooks/userdetails/UseGroupMembersDetails';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseDividedCost() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const { data: groupMembersDetails } = useGroupMembersDetails(expenseCreation.groupId);
  const { authState } = useContext(GlobalContext);

  function getErrors(): string {
    let otherUserWithoutCost = false;
    if (expenseCreation.divisionType === 'cost') {
      const sum = expenseCreation.expenseParticipants.reduce(
        (accumulator, currentValue) => currentValue.participantCost.add(accumulator),
        new Decimal(0),
      );
      if (!expenseCreation.totalCost.eq(sum)) {
        return t('The sum of partial costs does not match the total cost');
      }
      otherUserWithoutCost = !!expenseCreation.expenseParticipants.find(
        (participant) =>
          authState.userId !== participant.participantId && participant.participantCost.isZero(),
      );
    } else {
      const sumOfWeights = expenseCreation.expenseParticipants.reduce(
        (accumulator, currentValue) => currentValue.participantCost.add(accumulator),
        new Decimal(0),
      );

      otherUserWithoutCost = !!expenseCreation.expenseParticipants.find(
        (participant) =>
          authState.userId !== participant.participantId &&
          (participant.participantCost.isZero() ||
            participant.participantCost
              .dividedBy(sumOfWeights)
              .times(expenseCreation.totalCost)
              .toDecimalPlaces(2, Decimal.ROUND_DOWN)
              .isZero()),
      );
    }

    if (otherUserWithoutCost) {
      return t('Other members must have non-zero costs');
    }
    return '';
  }

  const isNextButtonDisabled = !!getErrors();

  function getDefaultCost(type: 'weight' | 'cost') {
    const size = expenseCreation.expenseParticipants.length;

    const participantWeight = new Decimal(1);

    const participantCost = expenseCreation.totalCost
      .dividedBy(size)
      .toDecimalPlaces(2, Decimal.ROUND_DOWN);

    const creatorCost = expenseCreation.totalCost.minus(participantCost.times(size - 1));

    return expenseCreation.expenseParticipants.map((participant) => ({
      participantId: participant.participantId,
      participantCost:
        type === 'weight'
          ? participantWeight
          : authState.userId === participant.participantId
            ? creatorCost
            : participantCost,
    }));
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex-col justify-between items-center space-y-8">
        <View className="w-full flex-col space-y-3 flex-1">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.VERY_LARGE} height={IconSize.VERY_LARGE} />
          </View>
          <View>
            <NavBar title={t('Cost division')} type="segment" />
          </View>
          {groupMembersDetails ? (
            <View className="space-y-3 flex-1 pb-8">
              <View>
                <SegmentedControls
                  activeSegmentIndex={expenseCreation.divisionType === 'weight' ? 0 : 1}
                  onValueChange={(index) => {
                    const divisionType = index === 0 ? 'weight' : 'cost';
                    setExpenseCreation({
                      ...expenseCreation,
                      divisionType,
                      expenseParticipants: getDefaultCost(divisionType),
                    });
                  }}
                  segments={[
                    {
                      text: t('Weight-based'),
                      onPress: () => {},
                    },
                    {
                      text: t('Cost-based'),
                      onPress: () => {},
                    },
                  ]}
                />
              </View>
              <View>
                <ScrollView showsVerticalScrollIndicator={false} className="space-y-2 ">
                  {expenseCreation.expenseParticipants.map((participant) => {
                    const details = groupMembersDetails.details.find(
                      (details) => details.id === participant.participantId,
                    );
                    return (
                      details && (
                        <View key={details.id}>
                          <UserCost
                            userDetails={details}
                            type={expenseCreation.divisionType}
                            value={participant.participantCost.toNumber()}
                            currency={
                              expenseCreation.divisionType === 'weight'
                                ? undefined
                                : expenseCreation.baseCurrency.code
                            }
                            onPress={() => router.push(`/expenses/new/divided-cost/${details.id}`)}
                          />
                        </View>
                      )
                    );
                  })}
                </ScrollView>
                <View>{getErrors() && <Text className="text-red-base">{getErrors()}</Text>}</View>
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </View>
        <View className="py-8 w-full flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/expenses/new/attachment')}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
