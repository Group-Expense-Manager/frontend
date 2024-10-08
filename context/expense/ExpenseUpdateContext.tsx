import Decimal from 'decimal.js';
import React, { createContext, FC, ReactNode, useState } from 'react';

import { ImageBase64 } from '@/components/ui/image/CustomImage';
import { ExpenseParticipant } from '@/context/expense/ExpenseCreationContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export interface ExpenseUpdate {
  title: string;
  totalCost: Decimal;
  baseCurrency: Currency;
  targetCurrency?: Currency;
  expenseDate: Date;
  expenseParticipants: ExpenseParticipant[];
  divisionType: 'weight' | 'cost';
  message?: string;
  oldAttachment?: ImageBase64;
  newAttachment?: ImageBase64;
  newAttachmentId?: string;
  oldAttachmentId?: string;
}

interface ExpenseUpdateContextProps {
  expenseUpdate: ExpenseUpdate;
  setExpenseUpdate: (ExpenseUpdate: ExpenseUpdate) => void;
}

const defaultExpenseUpdate: ExpenseUpdate = {
  title: '',
  totalCost: new Decimal(0),
  baseCurrency: { code: '' },
  expenseDate: new Date(),
  expenseParticipants: [],
  divisionType: 'cost',
};

export const ExpenseUpdateContext = createContext<ExpenseUpdateContextProps>({
  expenseUpdate: defaultExpenseUpdate,
  setExpenseUpdate: () => {},
});

export const ExpenseUpdateProvider: FC<{ children: ReactNode; update: ExpenseUpdate }> = ({
  children,
  update,
}) => {
  const [expenseUpdate, setExpenseUpdate] = useState<ExpenseUpdate>(update);

  return (
    <ExpenseUpdateContext.Provider value={{ expenseUpdate, setExpenseUpdate }}>
      {children}
    </ExpenseUpdateContext.Provider>
  );
};
