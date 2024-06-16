import { AxiosPromise } from 'axios';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VerificationContext } from '@/context/VerificationContext';
import useRegister from '@/hooks/auth/UseRegister';

export default function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isError, error } = useRegister(email, password);

  const handleRegister = () => {
    mutate();
  };

  return (
    <SafeAreaView className="w-full flex-1 justify-center">
      <Text className=" text-center font-bold">{t('Register')}</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
        value={password}
      />
      <Button onPress={handleRegister} title="Register" />
      <Button onPress={() => router.push('/(auth)/login')} title="Already have an account?" />
    </SafeAreaView>
  );
}
