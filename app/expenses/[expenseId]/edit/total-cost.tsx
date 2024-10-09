import Decimal from 'decimal.js';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import CostTextInput from '@/components/ui/text-input/CostTextInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { numberToString, toDecimal } from '@/util/StringUtils';

export default function EditExpenseTotalCost() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);
  const [totalCostString, setTotalCostString] = useState<string>(
    numberToString(expenseUpdate.totalCost),
  );

  const isNextButtonDisabled =
    expenseUpdate.totalCost.isZero() || expenseUpdate.totalCost.isNegative();

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <CostTextInput
              label={`${t('Total cost')} (${expenseUpdate.baseCurrency.code})`}
              onChangeText={(totalCost: string) => {
                setTotalCostString(totalCost);
                const totalCostNumber = toDecimal(totalCost);
                if (!totalCostNumber.eq(expenseUpdate.totalCost)) {
                  setExpenseUpdate({
                    ...expenseUpdate,
                    totalCost: totalCostNumber,
                    divisionType: 'weight',
                    expenseParticipants: expenseUpdate.expenseParticipants.map((participant) => ({
                      participantId: participant.participantId,
                      participantCost: new Decimal(1),
                    })),
                  });
                }
              }}
              value={totalCostString}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/expenses/${params.expenseId}/edit/participants`)}
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
