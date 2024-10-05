import { Stack } from 'expo-router';
import React from 'react';

import { PaymentCreationProvider } from '@/context/payment/PaymentCreationContext';
import { SelectInputProvider } from '@/context/utils/SelectInputContext';

const NewPaymentLayout = () => {
  return (
    <PaymentCreationProvider>
      <SelectInputProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SelectInputProvider>
    </PaymentCreationProvider>
  );
};
export default NewPaymentLayout;
