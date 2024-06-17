import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
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
  const [selectedItems, setSelectedItems] = useState<Currency[]>([]);
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);

  const handleSwitchChange = (text: string) => {
    setGroupCreationProps({
      name: groupCreationProps.name,
      acceptRequired: groupCreationProps.acceptRequired,
      groupCurrencies: groupCreationProps.groupCurrencies,
      attachmentId: groupCreationProps.attachmentId,
    });
  };

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
            setSelected={setSelectedItems}
            data={data!.currencies}
            key="code"
          />
          <Button
            title={t('Next')}
            onPress={() => router.push('(stepper)/(group-creation)/group-accept')}
          />
        </>
      )}

      <Button
        title={t('Back')}
        onPress={() => router.push('(stepper)/(group-creation)/group-name')}
      />
    </SafeAreaView>
  );
}
