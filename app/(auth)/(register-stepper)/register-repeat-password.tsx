import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { CustomButton, Loader } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import { ButtonType } from '@/components/ui/button/CustomButton';
import CustomValidatedTextInput from '@/components/ui/text-input/CustomValidatedTextInput';
import { LogoIcon } from '@/constants/Icon';
import { RegistrationContext } from '@/context/auth/RegistrationContext';
import useRegister from '@/hooks/auth/UseRegister';
import { Validator } from '@/util/Validator';

export default function Register() {
  const { t } = useTranslation();
  const { registrationProps, setRegistrationProps } = useContext(RegistrationContext);

  const { mutate: register, isPending: isRegistrationPending } = useRegister(
    registrationProps.username,
    registrationProps.email,
    registrationProps.password,
  );

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg === registrationProps.password;
      },
      errorMessage: t(`Passwords don't match`),
    },
  ]);

  const isRegisterButtonDisabled =
    validator.validate(registrationProps.repeatedPassword).length !== 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isRegistrationPending,
    );
    return () => backHandler.remove();
  }, [isRegistrationPending]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <Loader isLoading={isRegistrationPending} />
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width="150px" height="150px" />
            </View>
            <View className="py-[32px] w-full flex flex-col space-y-[32px]">
              <CustomValidatedTextInput
                label={t('Repeat password')}
                secureTextEntry
                onChangeText={(text: string) =>
                  setRegistrationProps({ ...registrationProps, repeatedPassword: text })
                }
                value={registrationProps.repeatedPassword}
                validator={validator}
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => register()}
                title={t('Register')}
                disabled={isRegisterButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/register-password')}
                title={t('Back')}
                type={ButtonType.OUTLINED}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
