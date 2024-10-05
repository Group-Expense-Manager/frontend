import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CustomButton from '@/components/ui/button/CustomButton';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import { LogoIcon } from '@/constants/Icon';
import { RegistrationContext } from '@/context/auth/RegistrationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function RegisterUsername() {
  const { t } = useTranslation();
  const { registrationProps, setRegistrationProps } = useContext(RegistrationContext);
  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.length >= 3;
      },
      errorMessage: t('Username must contain at least 3 characters'),
    },
    {
      rule(arg: string) {
        return arg.length <= 20;
      },
      errorMessage: t('Username may contain at most 20 characters'),
    },
    {
      rule: /^[\p{L}0-9_.+-]*$/u,
      errorMessage: t('Username can only contain letters, numbers and sings: "_.+-"'),
    },
  ]);

  const isNextButtonDisabled = validator.validate(registrationProps.username).length !== 0;

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
              <SingleTextInput
                label={t('Username')}
                onChangeText={(text: string) =>
                  setRegistrationProps({ ...registrationProps, username: text })
                }
                value={registrationProps.username}
                errorMessages={
                  registrationProps.username === ''
                    ? []
                    : validator.validate(registrationProps.username)
                }
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.push('/register-email')}
                title={t('Next')}
                disabled={isNextButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/login')}
                title={t('Already have an account?')}
                type={ButtonType.OUTLINED}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
