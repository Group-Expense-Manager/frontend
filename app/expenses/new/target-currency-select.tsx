import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useGroup from '@/hooks/group/UseGroup';

export default function BaseCurrencySelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<Currency>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const { expenseCreation } = useContext(ExpenseCreationContext);
  const { data: groupDetails } = useGroup(expenseCreation.groupId);
  const currencies = () => {
    return groupDetails?.groupCurrencies.map((currency) => {
      return { value: currency, name: currency.code };
    });
  };

  return <SelectList createRow={createRow} data={currencies()} title={t('Target currency')} />;
}
