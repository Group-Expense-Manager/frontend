import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import FullViewLoader from '@/components/ui/loader/FullViewLoader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LogoIcon } from '@/constants/Icon';
import { ReportCreationContext, ReportFormat } from '@/context/report/ReportCreationContext';
import useCreateReport from '@/hooks/report/UseCreateReport';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewReportFormat() {
  const { t } = useTranslation();

  const { reportCreation, setReportCreation } = useContext(ReportCreationContext);

  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>();

  const { mutate: createReport, isPending: isReportCreationPending } = useCreateReport();

  useEffect(() => {
    if (reportCreation.format) {
      setSelectedFormat(reportCreation.format);
    }
  }, [reportCreation.format]);

  function setReportFormat(reportFormat: ReportFormat) {
    setSelectedFormat(reportFormat);
    setReportCreation({
      ...reportCreation,
      format: reportFormat,
    });
  }

  const reportTypes = () => {
    return Object.values(ReportFormat).map((type) => ({ value: type, name: type }));
  };

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <FullViewLoader isLoading={isReportCreationPending} />
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <SelectInput
              onSelect={setReportFormat}
              onPress={() => router.navigate('/reports/new/format-select')}
              label={t('Report format')}
              value={selectedFormat}
              data={reportTypes()}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={createReport}
              title={t('Create report')}
              disabled={!reportCreation.format}
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
