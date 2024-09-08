import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SingleTextInputPopover from '@/components/ui/popover/SingleTextInputPopover';
import { VerificationContext } from '@/context/auth/VerificationContext';
import useSendVerificationEmail from '@/hooks/auth/UseSendVerificationEmail';
import useVerify from '@/hooks/auth/UseVerify';
import { ButtonType } from '@/util/ButtonType';

export default function VerifyModal() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { verificationProps, setVerificationProps } = useContext(VerificationContext);
  const [error, setError] = useState(false);
  const {
    mutate: verify,
    isPending: isVerificationPending,
    isError,
  } = useVerify(verificationProps.email, verificationProps.code);

  const { mutate: sendVerificationEmail, isPending: isEmailSendingPending } =
    useSendVerificationEmail(verificationProps.email);

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
    <SingleTextInputPopover
      title={t('Verify account')}
      description={t('Verify account - description')}
      singleTextInputProps={{
        label: t('Code'),
        value: verificationProps.code,
        linkLabel: {
          label: t('Send verification email again'),
          onPress: () => {
            sendVerificationEmail();
          },
        },
        onChangeText: (text) => setVerificationProps({ ...verificationProps, code: text }),
        errorMessages: error ? [t('Incorrect verification code')] : [],
      }}
      firstButtonProps={{
        title: t('Confirm'),
        onPress: () => {
          verify();
        },
        disabled: isConfirmButtonDisabled || error,
      }}
      secondButtonProps={{
        title: t('Cancel'),
        onPress: () => {
          setVerificationProps({ email: '', code: '' });
          router.navigate('/login');
        },
        type: ButtonType.OUTLINED,
      }}
      isLoading={isVerificationPending || isEmailSendingPending}
    />
  );
}
