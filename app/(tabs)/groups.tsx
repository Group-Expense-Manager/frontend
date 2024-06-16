import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useGroups from '@/hooks/group/UseGroups';
export default function Groups() {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);
  const { status, data, error, isFetching } = useGroups();

  return (
    <SafeAreaView className="flex-1 h-full justify-center">
      {isFetching ? (
        <Text>Loading...</Text>
      ) : data?.groups.length === 0 ? (
        <>
          <Text className="text-title2">{t("You don't belong to any group!")}</Text>
          <Button
            title={t('Create new group')}
            onPress={() => router.push('(stepper)/(group-creation)/group-name')}
          />
          <Button title={t('Join existing group')} />
        </>
      ) : (
        <Text>Hello: {JSON.stringify(data?.groups)}</Text>
      )}
    </SafeAreaView>
  );
}
