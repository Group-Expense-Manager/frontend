import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 justify-center">
      <Button
        title={t('Add new expense')}
        onPress={() => router.navigate('(stepper)/(expense-creation)/expense-group')}
      />
    </SafeAreaView>
  );
}
