import Decimal from 'decimal.js';
import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export enum PaymentType {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  NONE = 'OTHER',
}

export interface PaymentCreation {
  groupId: string;
  title: string;
  type?: PaymentType;
  value: Decimal;
  baseCurrency: Currency;
  targetCurrency?: Currency;
  date: Date;
  recipientId: string;
  message?: string;
  attachment?: ImageBase64;
  attachmentId?: string;
}

interface PaymentCreationContextProps {
  paymentCreation: PaymentCreation;
  setPaymentCreation: (PaymentCreation: PaymentCreation) => void;
}

const defaultPaymentCreation: PaymentCreation = {
  groupId: '',
  title: '',
  type: undefined,
  value: new Decimal(0),
  baseCurrency: { code: '' },
  targetCurrency: undefined,
  date: new Date(),
  recipientId: '',
  message: undefined,
  attachment: undefined,
  attachmentId: undefined,
};

export const PaymentCreationContext = createContext<PaymentCreationContextProps>({
  paymentCreation: defaultPaymentCreation,
  setPaymentCreation: () => {},
});

export const PaymentCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentCreation, setPaymentCreation] = useState<PaymentCreation>(defaultPaymentCreation);

  return (
    <PaymentCreationContext.Provider value={{ paymentCreation, setPaymentCreation }}>
      {children}
    </PaymentCreationContext.Provider>
  );
};
