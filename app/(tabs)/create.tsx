import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">Utworz</Text>
      <Button title={t('Create new expense')} onPress={console.log} />
    </SafeAreaView>
  );
}
