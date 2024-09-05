import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import CustomValidatedTextInput from '@/components/ui/text-input/CustomValidatedTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PasswordChangeContext } from '@/context/auth/PasswordChangeContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function ChangePasswordNew() {
  const { t } = useTranslation();
  const { passwordChangeProps, setPasswordChangeProps } = useContext(PasswordChangeContext);
  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.length >= 8;
      },
      errorMessage: t('Password must contain at least 8 characters'),
    },
    {
      rule(arg: string) {
        return arg.length <= 30;
      },
      errorMessage: t('Password may contain at most 30 characters'),
    },
    {
      rule: /^(?=.*[a-z]).+$/,
      errorMessage: t('Password must contain at least 1 lowercase letter'),
    },
    {
      rule: /^(?=.*[A-Z]).+$/,
      errorMessage: t('Password must contain at least 1 uppercase letter'),
    },

    {
      rule: /^(?=.*[@#$%^&+=!]).+$/,
      errorMessage: t('Password must contain at least 1 special character from: "@#$%^&+=!"'),
    },

    {
      rule: /^(?=.*\d).+$/,
      errorMessage: t('Password must contain at least 1 digit'),
    },
  ]);

  const isNextButtonDisabled = validator.validate(passwordChangeProps.newPassword).length !== 0;

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="py-[32px] w-full flex flex-col space-y-[32px]">
              <CustomValidatedTextInput
                value={passwordChangeProps.newPassword}
                label={t('New password')}
                secureTextEntry
                onChangeText={(text: string) =>
                  setPasswordChangeProps({ ...passwordChangeProps, newPassword: text })
                }
                validator={validator}
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/change-password-new-repeat')}
                title={t('Next')}
                disabled={isNextButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/change-password-old')}
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
