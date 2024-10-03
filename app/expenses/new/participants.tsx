import Decimal from 'decimal.js';
import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useGroupMembersDetails from '@/hooks/userdetails/UseGroupMembersDetails';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseParticipants() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const { data: groupMembersDetails } = useGroupMembersDetails(expenseCreation.groupId);

  const isNextButtonDisabled = expenseCreation.expenseParticipants.length < 2;

  useEffect(() => {
    if (groupMembersDetails) {
      if (groupMembersDetails.details.length > 1) {
        setExpenseCreation({
          ...expenseCreation,
          divisionType: 'weight',
          expenseParticipants: groupMembersDetails.details.map((details) => ({
            participantId: details.id,
            participantCost: new Decimal(1),
          })),
        });
      }
    }
  }, [groupMembersDetails]);

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            {groupMembersDetails ? (
              <SelectInput
                onSelect={() => {}}
                onPress={() => {}}
                label={t('Expense participants')}
              />
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/expenses/new/divided-cost')}
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
