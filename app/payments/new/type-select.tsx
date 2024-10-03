import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { PaymentType } from '@/context/payment/PaymentCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';

export default function PaymentTypeSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<GroupMemberDetails>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const data = () => {
    return Object.values(PaymentType).map((type) => ({ value: type, name: t(type) }));
  };

  return <SelectList createRow={createRow} data={data()} title={t('Payment method')} />;
}
