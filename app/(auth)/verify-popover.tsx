import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import VerificationPopover from '@/components/ui/popover/VerificationPopover';
import { VerificationContext } from '@/context/auth/VerificationContext';
import useSendVerificationEmail from '@/hooks/auth/UseSendVerificationEmail';
import useVerify from '@/hooks/auth/UseVerify';

export default function VerifyPopover() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { verificationProps, setVerificationProps } = useContext(VerificationContext);
  const [error, setError] = useState(false);
  const { mutate, isPending, isError } = useVerify(verificationProps.email, verificationProps.code);

  const { mutate: mutate2, isPending: isPending2 } = useSendVerificationEmail(
    verificationProps.email,
  );

  useEffect(() => {
    setError(false);
  }, [verificationProps.code]);

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);

  const isConfirmButtonDisabled = verificationProps.code.length === 0;

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);
  return (
    <VerificationPopover
      title={t('Verify account')}
      description={t('Verify account - description')}
      buttonTitle={t('Confirm')}
      onPress={() => {
        mutate();
      }}
      label={t('Code')}
      secondButtonTitle={t('Cancel')}
      secondOnPress={() => {
        setVerificationProps({ email: '', code: '' });
        router.navigate('login');
      }}
      linkLabel={t('Send verification email again')}
      onLinkPress={() => {
        mutate2();
      }}
      onChangeText={(text) => setVerificationProps({ ...verificationProps, code: text })}
      isPending={isPending || isPending2}
      disabled={isConfirmButtonDisabled || error}
      error={error}
      errorText={t('Incorrect verification code')}
    />
  );
}