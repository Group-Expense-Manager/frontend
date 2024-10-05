import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function NewExpenseTitle() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.trim().length > 0;
      },
      errorMessage: '',
    },
    {
      rule(arg: string) {
        return arg.length <= 30;
      },
      errorMessage: t('Expense title may contain at most 30 characters'),
    },
  ]);

  const isNextButtonDisabled = validator.validate(expenseCreation.title).length !== 0;

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Expense title')}
              onChangeText={(title: string) => setExpenseCreation({ ...expenseCreation, title })}
              value={expenseCreation.title}
              errorMessages={
                expenseCreation.title === '' ? [] : validator.validate(expenseCreation.title)
              }
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/expenses/new/date')}
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
