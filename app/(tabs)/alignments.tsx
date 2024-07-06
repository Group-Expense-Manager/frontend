import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Alignments() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">{t('Alignments')}</Text>
    </SafeAreaView>
  );
}
