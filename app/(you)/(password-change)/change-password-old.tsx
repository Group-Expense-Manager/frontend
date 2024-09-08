import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton } from '@/components';
import Box from '@/components/ui/box/Box';
import PasswordTextInput from '@/components/ui/text-input/PasswordTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PasswordChangeContext } from '@/context/auth/PasswordChangeContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function ChangePasswordOld() {
  const { t } = useTranslation();
  const { passwordChangeProps, setPasswordChangeProps } = useContext(PasswordChangeContext);
  const isNextButtonDisabled = passwordChangeProps.oldPassword.length === 0;

  return (
    <Box>
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
              <PasswordTextInput
                label={t('Old password')}
                onChangeText={(text: string) =>
                  setPasswordChangeProps({ ...passwordChangeProps, oldPassword: text })
                }
                value={passwordChangeProps.oldPassword}
              />
            </View>
          </View>

          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/change-password-new')}
                title={t('Next')}
                disabled={isNextButtonDisabled}
              />
            </View>
            <View className="w-full">
              <CustomButton
                onPress={() => router.navigate('/you')}
                title={t('Cancel')}
                type={ButtonType.OUTLINED}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Box>
  );
}