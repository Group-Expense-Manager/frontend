import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomImage from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import WeightTextInput from '@/components/ui/text-input/WeightTextInput';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { numberToString, toDecimal } from '@/util/StringUtils';

export default function EditExpenseDividedCost() {
  const { t } = useTranslation();
  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);
  const params = useLocalSearchParams<{ userId: string }>();

  const { userData } = useContext(GlobalContext);
  const { data: userDetails } = useGroupMemberDetails(userData.currentGroupId!, params.userId);
  const { data: userPicture } = useProfilePicture(params.userId, userDetails?.attachmentId);

  const [costString, setCostString] = useState<string>(getParticipantCostAsString());

  function getParticipantCostAsString(): string {
    return numberToString(
      expenseUpdate.expenseParticipants.find(
        (participant) => participant.participantId === params.userId,
      )!.participantCost,
    );
  }

  function setNewCost() {
    const updatedParticipants = expenseUpdate.expenseParticipants.map((participant) => {
      if (participant.participantId === params.userId) {
        return {
          participantId: participant.participantId,
          participantCost: toDecimal(costString),
        };
      }
      return participant;
    });

    setExpenseUpdate({ ...expenseUpdate, expenseParticipants: updatedParticipants });
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
              {expenseUpdate.divisionType === 'weight' ? (
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
                  label={`${t(`Cost`)} (${expenseUpdate.baseCurrency.code})`}
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
