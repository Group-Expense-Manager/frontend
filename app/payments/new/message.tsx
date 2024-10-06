import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import FullViewLoader from '@/components/ui/loader/FullViewLoader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { PaymentCreationContext } from '@/context/payment/PaymentCreationContext';
import useCreateGroupAttachment from '@/hooks/attachment/UseCreateGroupAttachment';
import useCreatePayment from '@/hooks/payment/UseCreatePayment';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewPaymentMessage() {
  const { t } = useTranslation();
  const { paymentCreation, setPaymentCreation } = useContext(PaymentCreationContext);

  const {
    mutate: createPayment,
    isPending: isPaymentCreationPending,
    isIdle: isPaymentCreationIdle,
  } = useCreatePayment();
  const {
    mutate: createAttachment,
    isPending: isAttachmentCreationPending,
    isSuccess: isAttachmentCreationSuccess,
  } = useCreateGroupAttachment(
    paymentCreation.groupId,
    paymentCreation.attachment!,
    (id: string) => setPaymentCreation({ ...paymentCreation, attachmentId: id }),
    () => router.push('/payments/new/error-modal'),
  );

  const isCreationPending =
    isPaymentCreationPending ||
    isAttachmentCreationPending ||
    (isPaymentCreationIdle && isAttachmentCreationSuccess);

  useEffect(() => {
    if (isAttachmentCreationSuccess) {
      createPayment();
    }
  }, [isAttachmentCreationSuccess]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isCreationPending);
    return () => backHandler.remove();
  }, [isCreationPending]);

  function create() {
    if (paymentCreation.attachment) {
      createAttachment();
    } else {
      createPayment();
    }
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <FullViewLoader isLoading={isCreationPending} />
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Message (optional)')}
              onChangeText={(text: string) => {
                const message = text ? text : undefined;
                setPaymentCreation({ ...paymentCreation, message });
              }}
              value={paymentCreation.message ?? ''}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton onPress={create} title={t('Create payment')} />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
