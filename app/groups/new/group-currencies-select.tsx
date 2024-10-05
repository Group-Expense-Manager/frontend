import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useAvailableCurrencies, { Currency } from '@/hooks/currency/UseAvailableCurrencies';

export default function CurrenciesSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<Currency>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const { data: availableCurrencies } = useAvailableCurrencies();

  const currencies = () => {
    return availableCurrencies?.currencies.map((currency) => {
      return { value: currency, name: currency.code };
    });
  };

  return <SelectList createRow={createRow} data={currencies()} title={t('Currencies')} />;
}
