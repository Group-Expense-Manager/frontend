import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { PaymentMethod } from '@/hooks/userdetails/UseUserDetails';

export default function EditProfilePreferredPaymentMethodSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<string>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const options = () => {
    return [
      { value: PaymentMethod.NONE, name: `${t(PaymentMethod.NONE)}` },
      { value: PaymentMethod.BANK_TRANSFER, name: `${t(PaymentMethod.BANK_TRANSFER)}` },
      { value: PaymentMethod.MOBILE_PAYMENT, name: `${t(PaymentMethod.MOBILE_PAYMENT)}` },
      { value: PaymentMethod.CASH, name: `${t(PaymentMethod.CASH)}` },
    ];
  };

  return <SelectList createRow={createRow} data={options()} title={t('Payment method')} />;
}
