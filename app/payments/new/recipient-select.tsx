import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import SelectList from '@/components/ui/text-input/select/SelectList';
import RadioButtonRow from '@/components/ui/text-input/select/row/RadioButtonRow';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';
import useGroupMembersDetails, {
  GroupMemberDetails,
} from '@/hooks/userdetails/UseGroupMembersDetails';
import { getFirstNameOrUsername } from '@/util/GetName';

export default function PaymentRecipientSelect() {
  const { t } = useTranslation();

  const createRow = (item: SelectInputData<GroupMemberDetails>, selected: boolean) => {
    return <RadioButtonRow item={item} selected={selected} />;
  };

  const { authState } = useContext(GlobalContext);
  const { paymentCreation } = useContext(PaymentCreationContext);
  const { data: membersDetails } = useGroupMembersDetails(paymentCreation.groupId);

  const data = () => {
    return membersDetails?.details
      .filter((memberDetails) => memberDetails.id !== authState.userId)
      .map((memberDetails) => {
        return { value: memberDetails, name: getFirstNameOrUsername(memberDetails) };
      });
  };

  return <SelectList createRow={createRow} data={data()} title={t('Recipient')} />;
}
