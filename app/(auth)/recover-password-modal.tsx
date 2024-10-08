import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EmailTextInputPopover from '@/components/ui/popover/EmailTextInputPopover';
import useRecoverPassword from '@/hooks/auth/UseRecoverPassword';
import { ButtonType } from '@/util/ButtonType';

export default function RecoverPasswordModal() {
  const { t } = useTranslation();
  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState('');

  const { mutate: recoverPassword, isPending: isPasswordRecoveryPending } =
    useRecoverPassword(passwordRecoveryEmail);
  const isConfirmButtonDisabled = passwordRecoveryEmail.trim().length === 0;

  return (
    <EmailTextInputPopover
      title={t('Password reset')}
      description={t('Password reset - description')}
      emailTextInputProps={{
        label: t('Email'),
        value: passwordRecoveryEmail,
        onChangeText: (text) => setPasswordRecoveryEmail(text),
      }}
      firstButtonProps={{
        title: t('Confirm'),
        onPress: () => recoverPassword(),
        disabled: isConfirmButtonDisabled,
      }}
      secondButtonProps={{
        title: t('Cancel'),
        onPress: () => router.navigate('/login'),
        type: ButtonType.OUTLINED,
      }}
      isLoading={isPasswordRecoveryPending}
    />
  );
}
