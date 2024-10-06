import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';

export default function EditPaymentTypeSelect() {
  const { t } = useTranslation();

  return <SelectList title={t('Payment method')} />;
}
