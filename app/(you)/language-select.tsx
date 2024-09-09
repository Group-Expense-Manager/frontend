import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputData } from '@/context/utils/SelectInputContext';

export default function LanguageSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<string>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const languages = () => {
    return [
      { value: 'en', name: `${t('en')}` },
      { value: 'pl', name: `${t('pl')}` },
    ];
  };

  return <SelectList createRow={createRow} data={languages()} title={t('Language')} />;
}
