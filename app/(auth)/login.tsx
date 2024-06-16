import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '@/context/AuthContext';
import { VerificationContext } from '@/context/VerificationContext';
import useLogin from '@/hooks/auth/UseLogin';
import useRegister from '@/hooks/auth/UseRegister';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isSuccess, isError, error, data } = useLogin(email, password);

  const login = async () => {
    mutate();
  };
  return (
    <SafeAreaView className="w-full flex-1 justify-center">
      <Text className=" text-center font-bold">{t('Login')}</Text>
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
      <Button onPress={login} title="Sign in" />
      <Button onPress={() => router.push('/(auth)/register')} title="Don't have account?" />
    </SafeAreaView>
  );
}
