import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { ReportCreationContext } from '@/context/report/ReportCreationContext';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';
import { Validator } from '@/util/Validator';

export default function NewReportTitle() {
  const { t } = useTranslation();
  const { reportCreation, setReportCreation } = useContext(ReportCreationContext);

  const validator = new Validator([
    {
      rule(arg: string) {
        return arg.trim().length > 0;
      },
      errorMessage: '',
    },
    {
      rule(arg: string) {
        return arg.length <= 30;
      },
      errorMessage: t('Report title may contain at most 30 characters'),
    },
  ]);

  const isNextButtonDisabled = validator.validate(reportCreation.title).length !== 0;

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Report title')}
              onChangeText={(title: string) => setReportCreation({ ...reportCreation, title })}
              value={reportCreation.title}
              errorMessages={
                reportCreation.title === '' ? [] : validator.validate(reportCreation.title)
              }
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/reports/new/format')}
              title={t('Next')}
              disabled={isNextButtonDisabled}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
