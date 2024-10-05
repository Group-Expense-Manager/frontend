import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { PaymentMethod } from '@/hooks/userdetails/UseUserDetails';

export default function PreferredPaymentMethodSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<string>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const options = () => {
    return Object.values(PaymentMethod).map((method: PaymentMethod) => ({
      value: method,
      name: t(method),
    }));
  };

  return <SelectList createRow={createRow} data={options()} title={t('Payment method')} />;
}
