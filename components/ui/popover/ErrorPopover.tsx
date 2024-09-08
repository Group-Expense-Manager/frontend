import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SingleButtonPopover from '@/components/ui/popover/SingleButtonPopover';

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
    <SingleButtonPopover
      title={t('Oops something went wrong')}
      description={t('Oops something went wrong - description')}
      buttonProps={{
        title: t('OK'),
        onPress,
      }}
    />
  );
};

export default ErrorPopover;
