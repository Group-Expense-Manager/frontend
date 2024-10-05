import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomImage from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import WeightTextInput from '@/components/ui/text-input/WeightTextInput';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { toDecimal } from '@/util/StringUtils';

export default function NewExpenseDividedCost() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const params = useLocalSearchParams<{ userId: string }>();

  const { data: userDetails } = useGroupMemberDetails(expenseCreation.groupId, params.userId);
  const { data: userPicture } = useProfilePicture(params.userId, userDetails?.attachmentId);

  const [costString, setCostString] = useState<string>(getParticipantCostAsString());

  function getParticipantCostAsString(): string {
    return expenseCreation.expenseParticipants
      .find((participant) => participant.participantId === params.userId)!
      .participantCost.toString()
      .replace('.', ',');
  }

  function setNewCost() {
    const updatedParticipants = expenseCreation.expenseParticipants.map((participant) => {
      if (participant.participantId === params.userId) {
        return {
          participantId: participant.participantId,
          participantCost: toDecimal(costString),
        };
      }
      return participant;
    });

    setExpenseCreation({ ...expenseCreation, expenseParticipants: updatedParticipants });
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex-col">
        {userDetails && userPicture ? (
          <View className="space-y-3 justify-start items-center">
            <View className="w-full flex justify-center items-center">
              <CustomImage size="colossal" image={userPicture} />
            </View>
            <View>
              {expenseCreation.divisionType === 'weight' ? (
                <WeightTextInput
                  label={t('Weight')}
                  value={costString}
                  onChangeText={(cost: string) => {
                    setCostString(cost);
                  }}
                  onBlur={() => {
                    if (getParticipantCostAsString() !== costString) {
                      setNewCost();
                    }
                    router.back();
                  }}
                  autoFocus
                />
              ) : (
                <CostTextInput
                  label={t(`Cost (${expenseCreation.baseCurrency.code})`)}
                  value={costString}
                  onChangeText={(cost: string) => {
                    setCostString(cost);
                  }}
                  onBlur={() => {
                    if (getParticipantCostAsString() !== costString) {
                      setNewCost();
                    }
                    router.back();
                  }}
                  autoFocus
                />
              )}
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </Box>
  );
}
