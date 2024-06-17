import { router } from 'expo-router';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupCreationContext } from '@/context/GroupCreationContext';

export default function GroupName() {
  const { t } = useTranslation();
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);

  const handleTextInputChange = (text: string) => {
    setGroupCreationProps({
      name: text,
      acceptRequired: groupCreationProps.acceptRequired,
      groupCurrencies: groupCreationProps.groupCurrencies,
      attachmentId: groupCreationProps.attachmentId,
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <TextInput
        className="text-center"
        placeholder={t('Group name')}
        onChangeText={(text) => handleTextInputChange(text)}
      />
      <Button
        title={t('Next')}
        onPress={() => router.navigate('(stepper)/(group-creation)/group-currency')}
      />
      <Button title={t('Cancel')} onPress={() => router.navigate('(tabs)/groups')} />
    </SafeAreaView>
  );
}
