import Decimal from 'decimal.js';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import GroupSelectInput from '@/components/ui/text-input/select/GroupSelectInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import useGroups, { Group } from '@/hooks/group/UseGroups';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentGroup() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{
    recipientId?: string;
    currency?: string;
    value?: string;
  }>();

  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);

  const { userData } = useContext(GlobalContext);

  const { data: groups } = useGroups();

  const [selectedGroup, setSelectedGroup] = useState<Group>({
    groupId: '',
    name: '',
    ownerId: '',
    attachmentId: '',
  });

  const groupList = () => {
    return groups?.map((group) => {
      return { value: group, name: group.name };
    });
  };

  useEffect(() => {
    if (groups && !selectedGroup.name) {
      const selected = groups.find((group) => group.groupId === userData.currentGroupId);
      if (selected) {
        setSelectedGroup(selected);
        if (params.currency && params.recipientId && params.value) {
          setPaymentCreation({
            ...paymentCreation,
            groupId: selected.groupId,
            recipientId: params.recipientId,
            baseCurrency: { code: params.currency },
            value: new Decimal(params.value),
          });
        } else {
          setPaymentCreation({
            ...paymentCreation,
            groupId: selected.groupId,
          });
        }
      }
    }
  }, [groups]);

  function setGroup(group: Group) {
    if (group.groupId !== paymentCreation.groupId) {
      setSelectedGroup(group);
      setPaymentCreation({
        ...paymentCreation,
        groupId: group.groupId,
        baseCurrency: { code: '' },
        targetCurrency: undefined,
        recipientId: '',
      });
    }
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            {groups ? (
              <GroupSelectInput
                onSelect={setGroup}
                onPress={() => router.navigate('/payments/new/group-select')}
                label={t('Payment group')}
                value={selectedGroup}
                data={groupList()}
              />
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push('/payments/new/recipient')}
              title={t('Next')}
              disabled={!paymentCreation.groupId}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Cancel')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
