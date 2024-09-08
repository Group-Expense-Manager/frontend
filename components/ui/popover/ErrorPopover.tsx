import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CustomPopover from '@/components/ui/popover/CustomPopover';

interface ErrorPopoverProps {
  onPress?: () => void;
}

const ErrorPopover: React.FC<ErrorPopoverProps> = ({ onPress = () => router.back() }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal', headerShown: false });
  }, [navigation]);
  return (
    <CustomPopover
      title={t('Oops something went wrong')}
      description={t('Oops something went wrong - description')}
      buttonTitle={t('OK')}
      onPress={onPress}
    />
  );
};

export default ErrorPopover;
