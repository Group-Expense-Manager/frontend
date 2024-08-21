import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput, Loader } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import CustomLinkTextInput from '@/components/ui/text-input/CustomLinkTextInput';
import { LogoIcon } from '@/constants/Icon';
import useLogin from '@/hooks/auth/UseLogin';
import { ButtonType } from '@/util/ButtonType';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLogin(email, password);

  const isLoginButtonDisabled = email.length === 0 || password.length === 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, [isPending]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <Loader isLoading={isPending} />
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
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
                <CustomLinkTextInput
                  label={t('Password')}
                  secureTextEntry
                  onChangeText={(text: string) => setPassword(text)}
                  value={password}
                  linkLabel={t('Forgot password?')}
                  onPress={() => router.push('recover-password-popover')}
                />
              </View>
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => mutate()}
                title={t('Login')}
                disabled={isLoginButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => {
                  setEmail('');
                  setPassword('');
                  router.push('register-username');
                }}
                title={t("Don't have an account?")}
                type={ButtonType.OUTLINED}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
