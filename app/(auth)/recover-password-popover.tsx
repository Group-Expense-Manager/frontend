import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomDecisionPopover from '@/components/ui/popover/CustomDecisionPopover';
import useRecoverPassword from '@/hooks/auth/UseRecoverPassword';

export default function RecoverPasswordPopover() {
  const { t } = useTranslation();
  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState('');
  const navigation = useNavigation();

  const { mutate: recoverPassword, isPending: isPasswordRecoveryPending } =
    useRecoverPassword(passwordRecoveryEmail);
  const isConfirmButtonDisabled = passwordRecoveryEmail.trim().length === 0;
  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <CustomDecisionPopover
      title={t('Password reset')}
      description={t('Password reset - description')}
      buttonTitle={t('Confirm')}
      onPress={() => {
        recoverPassword();
      }}
      label={t('Email')}
      secondButtonTitle={t('Cancel')}
      secondOnPress={() => {
        router.navigate('/login');
      }}
      onChangeText={(text) => setPasswordRecoveryEmail(text)}
      isPending={isPasswordRecoveryPending}
      disabled={isConfirmButtonDisabled}
    />
  );
}
