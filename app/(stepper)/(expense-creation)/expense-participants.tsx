// import { router } from 'expo-router';
// import exp from 'node:constants';
// import { useContext, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Button, TextInput } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
//
// import { SelectList } from '@/components';
// import { ExpenseCreationContext } from '@/context/ExpenseCreationContext';
// import useGroup, { Currency } from '@/hooks/group/UseGroup';
//
// export default function ExpenseParticipants() {
//   const { t } = useTranslation();
//   const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);
//   const { status, data, error, isFetching } = useGroup(expenseCreationProps.groupId);
//   const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
//   function mapToSelectList() {
//     if (data) {
//       return data.groupCurrencies.map((currency: Currency) => ({
//         key: currency.code,
//         value: currency.code,
//       }));
//     }
//     return [];
//   }
//
//   useEffect(() => {
//     if (selectedCurrency !== expenseCreationProps.baseCurrency)
//       setExpenseCreationProps({
//         groupId: expenseCreationProps.groupId,
//         title: expenseCreationProps.title,
//         cost: expenseCreationProps.cost,
//         baseCurrency: expenseCreationProps.baseCurrency,
//         targetCurrency: expenseCreationProps.targetCurrency,
//         expenseDate: expenseCreationProps.expenseDate,
//         expenseParticipants: ,
//         message: expenseCreationProps.message,
//         attachmentId: expenseCreationProps.attachmentId,
//       });
//   }, [selectedCurrency]);
//
//   return (
//     <SafeAreaView className="flex-1 justify-center">
//       <SelectList
//         name={t('Select currency')}
//         setSelected={setSelectedCurrency}
//         data={mapToSelectList()}
//       />
//       <Button
//         title={t('Next')}
//         onPress={() => router.navigate('(stepper)/(expense-creation)/expense-cost')}
//       />
//       <Button
//         title={t('Back')}
//         onPress={() => router.navigate('(stepper)/(expense-creation)/expense-date')}
//       />
//     </SafeAreaView>
//   );
// }
