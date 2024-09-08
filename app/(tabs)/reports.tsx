import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SafeView from '@/components/ui/box/SafeView';

export default function Reports() {
  const { t } = useTranslation();
  return (
    <SafeView>
      <Text className="text-center dark:bg-sky-lightest">{t('Reports')}</Text>
    </SafeView>
  );
}
