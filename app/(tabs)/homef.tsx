import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/UseAuth';
import useLogin from '@/hooks/auth/UseLogin';
import useLogout from '@/hooks/auth/UseLogout';

export default function Homef() {
  const { mutate, isSuccess, isError, error, data } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
