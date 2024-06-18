import { router } from 'expo-router';
import exp from 'node:constants';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput, SelectList } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';
import useGroup, { Currency } from '@/hooks/group/UseGroup';

export default function ExpenseCurrency() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
  const { status, data, error, isFetching } = useGroup(expenseCreationProps.groupId);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  function mapToSelectList() {
    if (data) {
      return data.groupCurrencies.map((currency: Currency) => ({
        key: currency.code,
        value: currency.code,
      }));
    }
    return [];
  }

  useEffect(() => {
    if (selectedCurrency !== expenseCreationProps.baseCurrency)
      setExpenseCreationProps({
        groupId: expenseCreationProps.groupId,
        title: expenseCreationProps.title,
        cost: expenseCreationProps.cost,
        baseCurrency: selectedCurrency,
        targetCurrency: expenseCreationProps.targetCurrency,
        expenseDate: expenseCreationProps.expenseDate,
        expenseParticipants: expenseCreationProps.expenseParticipants,
        message: expenseCreationProps.message,
        attachmentId: expenseCreationProps.attachmentId,
      });
  }, [selectedCurrency]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <View>
              <SelectList
                name={t('Select currency')}
                setSelected={setSelectedCurrency}
                data={mapToSelectList()}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                title={t('Next')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                title={t('Back')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-date')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
