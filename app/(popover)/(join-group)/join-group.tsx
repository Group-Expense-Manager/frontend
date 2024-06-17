import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VerificationContext } from '@/context/VerificationContext';
import useVerify from '@/hooks/auth/UseVerify';
import useJoinGroup from '@/hooks/group/UseJoinGroup';

export default function JoinGroup() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const { mutate, isError, error } = useJoinGroup(code);

  const handleJoinGroup = async () => {
    mutate();
  };

  return (
    <SafeAreaView className="w-full flex-1 justify-center">
      <Text className=" text-center font-bold">{t('Join group')}</Text>
      <TextInput
        placeholder={t('Code')}
        secureTextEntry
        onChangeText={(text: string) => setCode(text)}
        value={code}
      />
      <Button onPress={handleJoinGroup} title={t('Join')} />
      <Button onPress={router.back} title={t('Cancel')} />
    </SafeAreaView>
  );
}
