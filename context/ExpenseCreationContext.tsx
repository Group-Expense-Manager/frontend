import React, { createContext, useState, ReactNode, FC } from 'react';

export interface ExpenseParticipant {
  participantId: string;
  participantCost: number;
}

export interface ExpenseCreationProps {
  groupId: string;
  title: string;
  cost: number;
  baseCurrency: string;
  targetCurrency: string | undefined;
  expenseDate: Date;
  expenseParticipants: ExpenseParticipant[];
  message: string | undefined;
  attachmentId: string | undefined;
}

interface ExpenseCreationContextProps {
  expenseCreationProps: ExpenseCreationProps;
  setExpenseCreationProps: (ExpenseCreationProps: ExpenseCreationProps) => void;
}

const defaultExpenseCreationProps: ExpenseCreationProps = {
  groupId: '',
  title: '',
  cost: 0,
  baseCurrency: '',
  targetCurrency: undefined,
  expenseDate: new Date(1),
  expenseParticipants: [],
  message: undefined,
  attachmentId: undefined,
};

export const ExpenseCreationContext = createContext<ExpenseCreationContextProps>({
  expenseCreationProps: defaultExpenseCreationProps,
  setExpenseCreationProps: () => {},
});

export const ExpenseCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expenseCreationProps, setExpenseCreationProps] = useState<ExpenseCreationProps>(
    defaultExpenseCreationProps,
  );

  return (
    <ExpenseCreationContext.Provider value={{ expenseCreationProps, setExpenseCreationProps }}>
      {children}
    </ExpenseCreationContext.Provider>
  );
};
