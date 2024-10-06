import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import NavBar from '@/components/ui/bar/NavBar';
import Box from '@/components/ui/box/Box';
import AttachmentButton from '@/components/ui/button/AttachmentButton';
import CustomButton from '@/components/ui/button/CustomButton';
import { LogoIcon } from '@/constants/Icon';
import { PaymentUpdateContext } from '@/context/payment/PaymentUpdateContext';
import { ButtonType } from '@/util/ButtonType';
import { handleImageChoice } from '@/util/HandleImageChoice';
import { IconSize } from '@/util/IconSize';

export default function EditPaymentAttachment() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ paymentId: string }>();

  const { paymentUpdate, setPaymentUpdate } = useContext(PaymentUpdateContext);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      await handleImageChoice(
        result.assets[0],
        () => router.push(`/payments/${params.paymentId}/edit/unsupported-file-format-modal`),
        (mimeType?: string, base64?: string | null) =>
          setPaymentUpdate({
            ...paymentUpdate,
            newAttachment: {
              uri: `data:${mimeType};base64,${base64}`,
            },
          }),
      );
    }
  };

  return (
    <Box>
      <View className="py-8 w-full h-full flex flex-col justify-between items-center">
        <View className="w-full space-y-3 flex-1">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width={IconSize.VERY_LARGE} height={IconSize.VERY_LARGE} />
          </View>
          <View>
            <NavBar title={t('Attachment (optional)')} type="segment" />
          </View>
          <View className="flex-1 justify-center">
            <AttachmentButton
              onAddPress={pickImage}
              onRemovePress={() =>
                setPaymentUpdate({
                  ...paymentUpdate,
                  newAttachment: undefined,
                  newAttachmentId: undefined,
                })
              }
              image={paymentUpdate.newAttachment}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton
              onPress={() => router.push(`/payments/${params.paymentId}/edit/message`)}
              title={t('Next')}
            />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
