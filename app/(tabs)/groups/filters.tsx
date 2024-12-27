import { useNavigation } from 'expo-router';
import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomSwitch from '@/components/ui/switch/CustomSwitch';
import CustomTable from '@/components/ui/table/CustomTable';
import ExpandableSelectList from '@/components/ui/text-input/select/ExpandableSelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { GlobalContext } from '@/context/GlobalContext';
import { FiltersContext } from '@/context/filter/FiltersContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useGroup from '@/hooks/group/UseGroup';

export default function ExpenseBaseCurrencySelect() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Filters')} />,
    });
  }, [navigation]);

  const createRow = (item: SelectInputData<any>, selected: boolean): ReactNode => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const { filters, setFilters } = useContext(FiltersContext);
  const [selectedData, setSelectedData] = useState(filters);
  const { userData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);

  const groupCurrencies = () => {
    return groupDetails?.groupCurrencies.map((currency) => {
      return { value: currency.code, name: currency.code };
    });
  };

  return (
    <Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col w-full flex-wrap">
          <SingleClickTouchableOpacity
            delay={500}
            activeOpacity={1}
            onPress={() => {
              setSelectedData({
                ...selectedData,
                isCreator: selectedData.isCreator === 'true' ? undefined : 'true',
              });
              setFilters({
                ...filters,
                isCreator: selectedData.isCreator === 'true' ? undefined : 'true',
              });
            }}>
            <CustomTable title={t('Created by me')} textSize="large">
              <CustomSwitch value={selectedData.isCreator === 'true'} />
            </CustomTable>
          </SingleClickTouchableOpacity>
          <ExpandableSelectList
            title={t('Type')}
            selectInputProps={{
              data: [
                { name: t('EXPENSE_FILTER'), value: 'EXPENSE' },
                { name: t('PAYMENT_FILTER'), value: 'PAYMENT' },
              ],
              selectedData: selectedData.type ? [selectedData.type] : [],
              createRow,
              onSelect: (selected) => {
                setSelectedData({
                  ...selectedData,
                  type: selected.value === selectedData.type ? undefined : selected.value,
                });
                setFilters({
                  ...filters,
                  type: selected.value === selectedData.type ? undefined : selected.value,
                });
              },
            }}
          />

          <ExpandableSelectList
            title={t('Status')}
            selectInputProps={{
              data: [
                { name: t('ACCEPTED_FILTER'), value: 'ACCEPTED' },
                { name: t('REJECTED_FILTER'), value: 'REJECTED' },
                { name: t('PENDING_FILTER'), value: 'PENDING' },
              ],
              selectedData: selectedData.status ? [selectedData.status] : [],
              createRow,
              onSelect: (selected) => {
                setSelectedData({
                  ...selectedData,
                  status: selected.value === selectedData.status ? undefined : selected.value,
                });
                setFilters({
                  ...filters,
                  status: selected.value === selectedData.status ? undefined : selected.value,
                });
              },
            }}
          />

          <ExpandableSelectList
            title={t('Currency')}
            selectInputProps={{
              data: groupCurrencies() ?? [],
              selectedData: selectedData.currency ? [selectedData.currency] : [],
              createRow,
              onSelect: (selected) => {
                setSelectedData({
                  ...selectedData,
                  currency: selected.value === selectedData.currency ? undefined : selected.value,
                });
                setFilters({
                  ...filters,
                  currency: selected.value === selectedData.currency ? undefined : selected.value,
                });
              },
            }}
          />

          <ExpandableSelectList
            title={t('Sorting')}
            selectInputProps={{
              data: [
                { name: t('TITLE_ASCENDING'), value: 'TITLE_ASCENDING' },
                { name: t('TITLE_DESCENDING'), value: 'TITLE_DESCENDING' },
                { name: t('DATE_ASCENDING'), value: 'DATE_ASCENDING' },
                { name: t('DATE_DESCENDING'), value: 'DATE_DESCENDING' },
              ],
              selectedData: selectedData.sorted ? [selectedData.sorted] : [],
              createRow,
              onSelect: (selected) => {
                setSelectedData({
                  ...selectedData,
                  sorted: selected.value === selectedData.sorted ? undefined : selected.value,
                });
                setFilters({
                  ...filters,
                  sorted: selected.value === selectedData.sorted ? undefined : selected.value,
                });
              },
            }}
          />
        </View>
      </ScrollView>
    </Box>
  );
}
