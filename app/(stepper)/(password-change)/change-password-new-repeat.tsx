import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { CustomButton, Loader } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import CustomValidatedTextInput from '@/components/ui/text-input/CustomValidatedTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PasswordChangeContext } from '@/context/auth/PasswordChangeContext';
import useChangePassword from '@/hooks/auth/UseChangePassword';
import { Validator } from '@/util/Validator';

export default function ChangePasswordNew() {
  const { t } = useTranslation();
  const { passwordChangeProps, setPasswordChangeProps } = useContext(PasswordChangeContext);
  const { mutate, isPending } = useChangePassword(
    passwordChangeProps.oldPassword,
    passwordChangeProps.newPassword,
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, [isPending]);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg === passwordChangeProps.newPassword;
      },
      errorMessage: t(`Passwords don't match`),
    },
  ]);

  const isChangePasswordButtonDisabled =
    validator.validate(passwordChangeProps.repeatedNewPassword).length !== 0;

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
              <CustomValidatedTextInput
                value={passwordChangeProps.repeatedNewPassword}
                label={t('Repeat new password')}
                secureTextEntry
                onChangeText={(text: string) =>
                  setPasswordChangeProps({ ...passwordChangeProps, repeatedNewPassword: text })
                }
                validator={validator}
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => mutate()}
                title={t('Change password')}
                disabled={isChangePasswordButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('change-password-new')}
                title={t('Back')}
                type="reversed"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
