import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton, CustomTextInput } from '@/components';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { VerificationContext } from '@/context/VerificationContext';
import useVerify from '@/hooks/auth/UseVerify';

export default function Verify() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const { verificationProps } = useContext(VerificationContext);
  const { mutate } = useVerify(verificationProps.email, code);

  const verify = async () => {
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
                placeholder={t('Code')}
                onChangeText={(text: string) => setCode(text)}
                value={code}
              />
            </View>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton onPress={verify} title={t('Verify')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
