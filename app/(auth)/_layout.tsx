import { Stack } from 'expo-router';

import { VerificationProvider } from '@/context/VerificationContext';

const AuthLayout = () => {
  return (
    <VerificationProvider>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </VerificationProvider>

    // <StatusBar backgroundColor="#161622" style="light" />
  );
};

export default AuthLayout;
