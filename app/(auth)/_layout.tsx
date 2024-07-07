import { Stack } from 'expo-router';

import { VerificationProvider } from '@/context/verification/VerificationContext';

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
  );
};

export default AuthLayout;
