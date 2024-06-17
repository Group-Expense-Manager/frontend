import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, GestureResponderEvent, Switch, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupCreationContext, GroupCreationProps } from '@/context/GroupCreationContext';
import useGroupCreation from '@/hooks/group/UseGroupCreation';

export default function GroupAccept() {
  const { t } = useTranslation();
  const { groupCreationProps, setGroupCreationProps } = useContext(GroupCreationContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    handleSwitchChange();
  };

  const createGroup = useGroupCreation();

  const handleCreateGroup = (groupCreationProps: GroupCreationProps) => {
    return (event: GestureResponderEvent) => {
      createGroup(groupCreationProps);
    };
  };
  const handleSwitchChange = () => {
    setGroupCreationProps({
      name: groupCreationProps.name,
      acceptRequired: isEnabled,
      groupCurrencies: groupCreationProps.groupCurrencies,
      attachmentId: groupCreationProps.attachmentId,
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">{t('Acceptance required')}</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
      <Button title={t('Create group')} onPress={handleCreateGroup(groupCreationProps)} />
      <Button
        title={t('Back')}
        onPress={() => router.navigate('(stepper)/(group-creation)/group-currency')}
      />
    </SafeAreaView>
  );
}
