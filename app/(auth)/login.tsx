import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { LogoIcon } from '@/constants/Icon';
import useLogin from '@/hooks/auth/UseLogin';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate } = useLogin(email, password);

  const login = async () => {
    mutate();
  };

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
              <CustomTextInput
                label={t('Email')}
                onChangeText={(text: string) => setEmail(text)}
                value={email}
              />
            </View>
            <View>
              <CustomTextInput
                label={t('Password')}
                secureTextEntry
                onChangeText={(text: string) => setPassword(text)}
                value={password}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton onPress={login} title={t('Login')} />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.push('/(auth)/register')}
                title={t("Don't have an account?")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
