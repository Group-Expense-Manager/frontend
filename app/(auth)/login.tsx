import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CustomButton from '@/components/ui/button/CustomButton';
import FullViewLoader from '@/components/ui/loader/FullViewLoader';
import EmailTextInput from '@/components/ui/text-input/EmailTextInput';
import PasswordTextInput from '@/components/ui/text-input/PasswordTextInput';
import { LogoIcon } from '@/constants/Icon';
import useLogin from '@/hooks/auth/UseLogin';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending: isLoginPending } = useLogin(email, password);

  const isLoginButtonDisabled = email.length === 0 || password.length === 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isLoginPending);
    return () => backHandler.remove();
  }, [isLoginPending]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <FullViewLoader isLoading={isLoginPending} />
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="py-[32px] w-full flex flex-col space-y-[32px]">
              <View>
                <EmailTextInput
                  label={t('Email')}
                  onChangeText={(text: string) => setEmail(text)}
                  value={email}
                />
              </View>
              <View>
                <PasswordTextInput
                  label={t('Password')}
                  onChangeText={(text: string) => setPassword(text)}
                  value={password}
                  linkLabel={{
                    label: t('Forgot password?'),
                    onPress: () => router.push('/recover-password-modal'),
                  }}
                />
              </View>
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => login()}
                title={t('Login')}
                disabled={isLoginButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => {
                  setEmail('');
                  setPassword('');
                  router.push('/register-username');
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
