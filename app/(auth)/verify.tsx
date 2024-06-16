import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VerificationContext } from '@/context/VerificationContext';
import { useAuth } from '@/hooks/UseAuth';
import useRegister from '@/hooks/auth/UseRegister';
import useVerify from '@/hooks/auth/UseVerify';

export default function Verify() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const { verificationProps } = useContext(VerificationContext);
  const { mutate, isError, error } = useVerify(verificationProps.email, code);

  const verify = async () => {
    mutate();
  };

  return (
    <SafeAreaView className="w-full flex-1 justify-center">
      <Text className=" text-center font-bold">{t('Verify')}</Text>
      <Text className=" text-center font-bold">{verificationProps.email}</Text>
      <TextInput
        placeholder="Code"
        secureTextEntry
        onChangeText={(text: string) => setCode(text)}
        value={code}
      />
      <Button onPress={verify} title="Verify code" />
    </SafeAreaView>
  );
}
