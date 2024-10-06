import Decimal from 'decimal.js';
import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { PaymentType } from '@/context/payment/PaymentCreationContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export interface PaymentUpdate {
  title: string;
  type: PaymentType;
  value: Decimal;
  baseCurrency: Currency;
  targetCurrency?: Currency;
  date: Date;
  message?: string;
  oldAttachment?: ImageBase64;
  newAttachment?: ImageBase64;
  newAttachmentId?: string;
  oldAttachmentId?: string;
}

interface PaymentUpdateContextProps {
  paymentUpdate: PaymentUpdate;
  setPaymentUpdate: (PaymentUpdate: PaymentUpdate) => void;
}

const defaultPaymentUpdate: PaymentUpdate = {
  title: '',
  type: PaymentType.NONE,
  value: new Decimal(0),
  baseCurrency: { code: '' },
  date: new Date(),
};

export const PaymentUpdateContext = createContext<PaymentUpdateContextProps>({
  paymentUpdate: defaultPaymentUpdate,
  setPaymentUpdate: () => {},
});

export const PaymentUpdateProvider: FC<{ children: ReactNode; update: PaymentUpdate }> = ({
  children,
  update,
}) => {
  const [paymentUpdate, setPaymentUpdate] = useState<PaymentUpdate>(update);

  return (
    <PaymentUpdateContext.Provider value={{ paymentUpdate, setPaymentUpdate }}>
      {children}
    </PaymentUpdateContext.Provider>
  );
};
