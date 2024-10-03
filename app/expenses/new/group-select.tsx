import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useGroups, { Group } from '@/hooks/group/UseGroups';

export default function GroupSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<Group>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const { data: groups } = useGroups();

  const data = () => {
    return groups?.map((group) => {
      return { value: group, name: group.name };
    });
  };

  return <SelectList createRow={createRow} data={data()} title={t('Groups')} />;
}
