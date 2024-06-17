import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SelectList } from '@/components';
import { GroupCreationContext } from '@/context/GroupCreationContext';
import useRegister from '@/hooks/auth/UseRegister';
import useAvailableCurrencies, { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export default function GroupCurrency() {
  const { t } = useTranslation();
  const { status, data, error, isFetching } = useAvailableCurrencies();
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

  function mapToSelectList(currencies: Currency[]) {
    return currencies.map((obj) => ({
      key: obj.code,
      value: obj.code,
    }));
  }
  return (
    <SafeAreaView className="flex-1 justify-center">
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text className="text-center">
            {t('Base currencies')} {JSON.stringify(data?.currencies)}
          </Text>
          <SelectList
            name={t('Base currencies')}
            setSelected={setSelectedCurrency}
            data={mapToSelectList(data!.currencies)}
            key="code"
          />
          <Button
            title={t('Next')}
            onPress={() => router.navigate('(stepper)/(group-creation)/group-accept')}
          />
        </>
      )}

      <Button
        title={t('Back')}
        onPress={() => router.navigate('(stepper)/(group-creation)/group-name')}
      />
    </SafeAreaView>
  );
}
