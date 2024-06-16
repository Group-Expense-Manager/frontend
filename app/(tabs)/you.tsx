import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useLogout from '@/hooks/auth/UseLogout';

export default function You() {
  const { t } = useTranslation();
  const { mutate, isSuccess, isError, error, data } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">{t('You')}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
