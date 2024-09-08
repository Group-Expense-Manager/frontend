import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, View } from 'react-native';

import { CustomButton, Loader } from '@/components';
import Box from '@/components/ui/box/Box';
import PasswordTextInput from '@/components/ui/text-input/PasswordTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PasswordChangeContext } from '@/context/auth/PasswordChangeContext';
import useChangePassword from '@/hooks/auth/UseChangePassword';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function ChangePasswordNew() {
  const { t } = useTranslation();
  const { passwordChangeProps, setPasswordChangeProps } = useContext(PasswordChangeContext);
  const { mutate: changePassword, isPending: isPasswordChangePending } = useChangePassword(
    passwordChangeProps.oldPassword,
    passwordChangeProps.newPassword,
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isPasswordChangePending,
    );
    return () => backHandler.remove();
  }, [isPasswordChangePending]);

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
    <Box>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <Loader isLoading={isPasswordChangePending} />
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="py-[32px] w-full flex flex-col space-y-[32px]">
              <PasswordTextInput
                label={t('Repeat new password')}
                onChangeText={(text: string) =>
                  setPasswordChangeProps({ ...passwordChangeProps, repeatedNewPassword: text })
                }
                value={passwordChangeProps.repeatedNewPassword}
                errorMessages={
                  passwordChangeProps.repeatedNewPassword === ''
                    ? []
                    : validator.validate(passwordChangeProps.repeatedNewPassword)
                }
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => changePassword()}
                title={t('Change password')}
                disabled={isChangePasswordButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/change-password-new')}
                title={t('Back')}
                type={ButtonType.OUTLINED}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Box>
  );
}
