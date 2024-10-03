import Decimal from 'decimal.js';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseTotalCost() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);
  const [totalCostString, setTotalCostString] = useState<string>(
    expenseCreation.totalCost.toString().replace('.', ','),
  );

  const isNextButtonDisabled =
    expenseCreation.totalCost.isZero() || expenseCreation.totalCost.isNegative();

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <CostTextInput
              label={`${t('Total cost')} (${expenseCreation.baseCurrency.code})`}
              onChangeText={(totalCost: string) => {
                setTotalCostString(totalCost);
                const totalCostNumber = new Decimal(totalCost ? totalCost.replace(',', '.') : 0);
                setExpenseCreation({
                  ...expenseCreation,
                  totalCost: totalCostNumber,
                  divisionType: 'weight',
                  expenseParticipants: expenseCreation.expenseParticipants.map((participant) => ({
                    participantId: participant.participantId,
                    participantCost: new Decimal(1),
                  })),
                });
              }}
              value={totalCostString}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/expenses/new/participants')}
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
