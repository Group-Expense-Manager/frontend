import Decimal from 'decimal.js';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton } from '@/components';
import ActivityAttachment from '@/components/modules/activity/ActivityAttachment';
import NavBar from '@/components/ui/bar/NavBar';
import OptionsBar from '@/components/ui/bar/OptionsBar';
import Box from '@/components/ui/box/Box';
import { ButtonColor } from '@/components/ui/button/CustomButton';
import CustomHeader from '@/components/ui/header/CustomHeader';
import Loader from '@/components/ui/loader/Loader';
import { EditIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import usePayment from '@/hooks/payment/UsePayment';
import useGroupMemberDetails from '@/hooks/userdetails/UseGroupMemberDetails';
import { ButtonType } from '@/util/ButtonType';
import { formatToDayMonthYear } from '@/util/DateUtils';
import { getNameFromUserDetails } from '@/util/GetName';

export default function PaymentView() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ paymentId: string }>();
  const { authState, userData } = useContext(GlobalContext);

  const { data: payment } = usePayment(params.paymentId);
  const { data: creatorDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    payment?.creatorId,
  );

  const { data: recipientDetails } = useGroupMemberDetails(
    userData.currentGroupId!,
    payment?.recipientId,
  );

  const role = () => {
    switch (true) {
      case !!payment && authState.userId === payment.creatorId:
        return 'creator';
      case !!payment && authState.userId === payment.recipientId:
        return 'recipient';
      default:
        return 'other';
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={t('Payment')}
          rightIcon={role() === 'creator' ? <EditIcon /> : undefined}
          onRightIconPress={role() === 'creator' ? () => {} : undefined}
        />
      ),
    });
  }, [navigation, role()]);

  return (
    <Box>
      {payment && creatorDetails && recipientDetails ? (
        <ScrollView className="space-y-3" showsVerticalScrollIndicator={false}>
          <View className="space-y-2">
            <NavBar type="segment" title={t('Details')} />
            <View>
              <OptionsBar
                leftText={t('Author')}
                rightText={getNameFromUserDetails(creatorDetails)}
              />
              <OptionsBar
                leftText={t('Recipient')}
                rightText={getNameFromUserDetails(recipientDetails)}
              />
              <OptionsBar leftText={t('Title')} rightText={payment.title} />
              <OptionsBar
                leftText={t('Value')}
                rightText={`${payment.amount.value} ${payment.amount.currency}`}
              />
              {payment.fxData?.targetCurrency && payment.fxData?.exchangeRate && (
                <OptionsBar
                  leftText={t('Cost after exchange rate conversion')}
                  rightText={`${new Decimal(payment.amount.value).times(payment.fxData.exchangeRate).toDecimalPlaces(2, Decimal.ROUND_DOWN)} ${payment.fxData?.targetCurrency}`}
                />
              )}
              <OptionsBar
                leftText={t('Payment date')}
                rightText={formatToDayMonthYear(new Date(payment.date))}
              />
              <OptionsBar leftText={t('Status')} rightText={t(`Status ${payment.status}`)} />
            </View>
          </View>

          {/*<View className="space-y-2">*/}
          {/*  <NavBar type="segment" title={t('Members')} />*/}
          {/*  <View className="space-y-2">*/}
          {/*    {[creatorAsParticipant(payment), ...payment.paymentParticipants].map(*/}
          {/*      (participant, index) => (*/}
          {/*        <View key={index}>*/}
          {/*          <Participant*/}
          {/*            participant={participant}*/}
          {/*            currency={payment.baseCurrency}*/}
          {/*            groupId={userData.currentGroupId!}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*      ),*/}
          {/*    )}*/}
          {/*  </View>*/}
          {/*</View>*/}

          <View className="space-y-2">
            <NavBar title={t('Attachment')} type="segment" />
            <View>
              <ActivityAttachment
                groupId={userData.currentGroupId!}
                attachmentId={payment.attachmentId}
              />
            </View>
          </View>
          <View className="space-y-2 pb-8">
            <NavBar title={t('Actions')} type="segment" />
            <View className="space-y-4">
              {role() === 'recipient' && (
                <View>
                  <CustomButton
                    title={t('Decide')}
                    onPress={() => router.push(`/payments/${params.paymentId}/decide-modal`)}
                  />
                </View>
              )}

              <View>
                <CustomButton
                  title={t('Show payment history')}
                  onPress={() => router.push(`/payments/${params.paymentId}/history`)}
                />
              </View>
              {role() === 'creator' && (
                <View>
                  <CustomButton
                    title={t('Delete payment')}
                    onPress={() =>
                      router.push(`/payments/${params.paymentId}/delete-payment-modal`)
                    }
                    type={ButtonType.OUTLINED}
                    color={ButtonColor.RED}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center w-full">
          <Loader />
        </View>
      )}
    </Box>
  );
}
