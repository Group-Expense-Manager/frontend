import Decimal from 'decimal.js';
import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export interface ExpenseParticipant {
  participantId: string;
  participantCost: Decimal;
}

export interface ExpenseCreation {
  groupId: string;
  title: string;
  totalCost: Decimal;
  baseCurrency: Currency;
  targetCurrency?: Currency;
  expenseDate: Date;
  expenseParticipants: ExpenseParticipant[];
  divisionType: 'weight' | 'cost';
  message?: string;
  attachment?: ImageBase64;
  attachmentId?: string;
}

interface ExpenseCreationContextProps {
  expenseCreation: ExpenseCreation;
  setExpenseCreation: (ExpenseCreation: ExpenseCreation) => void;
}

const defaultExpenseCreation: ExpenseCreation = {
  groupId: '',
  title: '',
  totalCost: new Decimal(0),
  baseCurrency: { code: '' },
  expenseDate: new Date(new Date().setHours(0, 0, 0, 0)),
  expenseParticipants: [],
  divisionType: 'weight',
};

export const ExpenseCreationContext = createContext<ExpenseCreationContextProps>({
  expenseCreation: defaultExpenseCreation,
  setExpenseCreation: () => {},
});

export const ExpenseCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expenseCreation, setExpenseCreation] = useState<ExpenseCreation>(defaultExpenseCreation);

  return (
    <ExpenseCreationContext.Provider value={{ expenseCreation, setExpenseCreation }}>
      {children}
    </ExpenseCreationContext.Provider>
  );
};
