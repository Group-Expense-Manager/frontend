import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import FilledActivityHistoryListItem from '@/components/modules/activity/FilledActivityHistoryListItem';
import Box from '@/components/ui/box/Box';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { GlobalContext } from '@/context/GlobalContext';
import usePayment from '@/hooks/payment/UsePayment';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';

export default function PaymentHistory() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ paymentId: string }>();
  const { authState, userData } = useContext(GlobalContext);

  const { data: payment } = usePayment(params.paymentId);
  const { data: groupMemberDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    payment?.creatorId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Payment history')} />,
    });
  }, [navigation]);

  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <Box>
      {payment && groupMemberDetails ? (
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}>
          {payment.history.map((entry, index) => (
            <View key={index}>
              <FilledActivityHistoryListItem
                historyEntry={{ ...entry, activityAction: entry.paymentAction }}
                groupId={userData.currentGroupId!}
                activityType="PAYMENT"
                position={authState.userId === entry.participantId ? 'right' : 'left'}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Loader />
      )}
    </Box>
  );
}
