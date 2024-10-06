import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import FullViewLoader from '@/components/ui/loader/FullViewLoader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import useCreateGroupAttachment from '@/hooks/attachment/UseCreateGroupAttachment';
import useUpdateGroupAttachment from '@/hooks/attachment/UseUpdateGroupAttachment';
import useUpdatePayment from '@/hooks/payment/UseUpdatePayment';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditPaymentMessage() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();

  const { userData } = useContext(GlobalContext);

  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);

  const {
    mutate: updatePayment,
    isPending: isPaymentUpdatePending,
    isIdle: isPaymentUpdateIdle,
  } = useUpdatePayment(userData.currentGroupId!, params.paymentId);

  const {
    mutate: createAttachment,
    isPending: isAttachmentCreationPending,
    isSuccess: isAttachmentCreationSuccess,
  } = useCreateGroupAttachment(
    userData.currentGroupId!,
    paymentUpdate.newAttachment!,
    (id: string) => setPaymentUpdate({ ...paymentUpdate, newAttachmentId: id }),
    () => router.push(`/payments/${params.paymentId}/edit/error-modal`),
  );

  const {
    mutate: updateAttachment,
    isPending: isAttachmentUpdatePending,
    isSuccess: isAttachmentUpdateSuccess,
  } = useUpdateGroupAttachment(
    userData.currentGroupId!,
    paymentUpdate.newAttachment!,
    paymentUpdate?.oldAttachmentId!,
    (id: string) => setPaymentUpdate({ ...paymentUpdate, newAttachmentId: id }),
    () => router.push(`/payments/${params.paymentId}/edit/error-modal`),
  );

  const isUpdatePending =
    isPaymentUpdatePending ||
    isAttachmentCreationPending ||
    isAttachmentUpdatePending ||
    (isPaymentUpdateIdle && (isAttachmentCreationSuccess || isAttachmentUpdateSuccess));

  useEffect(() => {
    if (isAttachmentCreationSuccess || isAttachmentUpdateSuccess) {
      updatePayment();
    }
  }, [isAttachmentCreationSuccess, isAttachmentUpdateSuccess]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isUpdatePending);
    return () => backHandler.remove();
  }, [isUpdatePending]);

  function update() {
    if (!paymentUpdate.oldAttachment && paymentUpdate.newAttachment) {
      createAttachment();
    } else if (
      paymentUpdate.newAttachment &&
      paymentUpdate.oldAttachment &&
      paymentUpdate.newAttachment.uri !== paymentUpdate.oldAttachment.uri
    ) {
      updateAttachment();
    } else {
      updatePayment();
    }
  }

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <FullViewLoader isLoading={isUpdatePending} />
        <View className="w-full">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
          </View>
          <View className="py-8 w-full flex flex-col space-y-8">
            <MultiTextInput
              label={t('Message (optional)')}
              onChangeText={(text: string) => {
                const message = text ? text : undefined;
                setPaymentUpdate({ ...paymentUpdate, message });
              }}
              value={paymentUpdate.message ?? ''}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton onPress={() => update()} title={t('Edit payment')} />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
