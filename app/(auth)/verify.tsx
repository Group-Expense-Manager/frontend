import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VerificationContext } from '@/context/VerificationContext';
import { useAuth } from '@/hooks/UseAuth';

export default function Verify() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  // const { onVerify } = useAuth();
  const { verificationProps } = useContext(VerificationContext);
  const verify = async () => {
    console.log('tu');
    // const result = await onVerify!(verificationProps.email, code);
    console.log(verificationProps.email);
    console.log(verificationProps.email);
    console.log(verificationProps.email);
  };

  return (
    <SafeAreaView className="w-full flex-1 justify-center">
      <Text className=" text-center font-bold">{t('Login')}</Text>
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
