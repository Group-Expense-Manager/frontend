import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SingleTextInputPopover from '@/components/ui/popover/SingleTextInputPopover';
import useJoinGroup from '@/hooks/group/UseJoinGroup';
import { ButtonType } from '@/util/ButtonType';

interface JoinGroupProps {
  isFirstGroup: boolean;
}

const JoinGroupPopover: React.FC<JoinGroupProps> = ({ isFirstGroup }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const {
    mutate: joinGroup,
    isPending: isJoinGroupPending,
    isError: isJoinGroupError,
  } = useJoinGroup(isFirstGroup, code);
  const isConfirmButtonDisabled = code.length === 0;

  useEffect(() => {
    setError(false);
  }, [code]);

  useEffect(() => {
    if (isJoinGroupError) {
      setError(true);
    }
  }, [isJoinGroupError]);

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal' });
  }, [navigation]);

  return (
    <SingleTextInputPopover
      title={t('Join group')}
      description={t('Join group - description')}
      singleTextInputProps={{
        label: t('Join code'),
        value: code,
        onChangeText: (text) => setCode(text),
        errorMessages: error ? [t('Incorrect join code')] : [],
      }}
      firstButtonProps={{
        title: t('Confirm'),
        onPress: joinGroup,
        disabled: isConfirmButtonDisabled || error,
      }}
      secondButtonProps={{
        title: t('Cancel'),
        onPress: router.back,
        type: ButtonType.OUTLINED,
      }}
      isLoading={isJoinGroupPending}
    />
  );
};

export default JoinGroupPopover;
