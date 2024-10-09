import Decimal from 'decimal.js';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import UserMultiSelectInput from '@/components/ui/text-input/select/UserMultiSelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import useGroupMembersDetails, {
  GroupMemberDetails,
} from '@/hooks/userdetails/UseGroupMembersDetails';
import { ButtonType } from '@/util/ButtonType';
import { getFirstNameOrUsername } from '@/util/GetName';
import { IconSize } from '@/util/IconSize';

export default function EditExpenseParticipants() {
  const { t } = useTranslation();
  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);
  const { userData } = useContext(GlobalContext);
  const { data: groupMembersDetails } = useGroupMembersDetails(userData.currentGroupId!);
  const params = useLocalSearchParams<{ expenseId: string }>();
  const hasMounted = useRef(false);

  const { authState } = useContext(GlobalContext);

  const [selectedMembers, setSelectedMembers] = useState<GroupMemberDetails[]>([]);

  const isNextButtonDisabled = expenseUpdate.expenseParticipants.length < 2;

  useLayoutEffect(() => {
    if (groupMembersDetails) {
      setSelectedMembers(
        groupMembersDetails.details.filter((details) =>
          expenseUpdate.expenseParticipants.some(
            (participant) => participant.participantId === details.id,
          ),
        ),
      );
    }
  }, [groupMembersDetails]);

  const participants = () => {
    return groupMembersDetails?.details.map((memberDetails) => {
      return {
        value: memberDetails,
        name: getFirstNameOrUsername(memberDetails),
        isDisabled: memberDetails.id === authState.userId,
      };
    });
  };

  function setParticipants(membersDetails: GroupMemberDetails[]) {
    if (hasMounted.current) {
      setExpenseUpdate({
        ...expenseUpdate,
        divisionType: 'weight',
        expenseParticipants: membersDetails.map((details) => ({
          participantId: details.id,
          participantCost: new Decimal(1),
        })),
      });
    } else {
      hasMounted.current = true;
    }
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            {groupMembersDetails ? (
              <UserMultiSelectInput
                onSelect={setParticipants}
                onPress={() =>
                  router.navigate(`/expenses/${params.expenseId}/edit/participants-select`)
                }
                values={selectedMembers}
                setValues={setSelectedMembers}
                data={participants()}
                label={t('Expense members')}
              />
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/expenses/${params.expenseId}/edit/divided-cost`)}
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
