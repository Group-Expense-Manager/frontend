import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, SelectList } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { GroupCreationContext } from '@/context/GroupCreationContext';
import useAvailableCurrencies, { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export default function GroupCurrency() {
  const { t } = useTranslation();
  const { data } = useAvailableCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);

  useEffect(() => {
    console.log(selectedCurrency);
    setGroupCreationProps({
      name: groupCreationProps.name,
      acceptRequired: groupCreationProps.acceptRequired,
      groupCurrencies: selectedCurrency,
      attachmentId: groupCreationProps.attachmentId,
    });
  }, [selectedCurrency]);

  function mapToSelectList(currencies: Currency[] | undefined) {
    if (currencies === undefined) {
      return [];
    }
    return currencies.map((obj) => ({
      key: obj.code,
      value: obj.code,
    }));
  }

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
                name={t('Base currencies')}
                setSelected={setSelectedCurrency}
                data={mapToSelectList(data?.currencies)}
                key="code"
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(group-creation)/group-accept')}
                title={t('Next')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('(stepper)/(group-creation)/group-name')}
                title={t('Back')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
