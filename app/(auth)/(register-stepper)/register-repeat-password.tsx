import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { CustomButton, FullViewLoader } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import PasswordTextInput from '@/components/ui/text-input/PasswordTextInput';
import { LogoIcon } from '@/constants/Icon';
import { RegistrationContext } from '@/context/auth/RegistrationContext';
import useRegister from '@/hooks/auth/UseRegister';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
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
        <FullViewLoader isLoading={isRegistrationPending} />
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="py-[32px] w-full flex flex-col space-y-[32px]">
              <PasswordTextInput
                label={t('Repeat password')}
                onChangeText={(text: string) =>
                  setRegistrationProps({ ...registrationProps, repeatedPassword: text })
                }
                value={registrationProps.repeatedPassword}
                errorMessages={
                  registrationProps.password === ''
                    ? []
                    : validator.validate(registrationProps.password)
                }
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
