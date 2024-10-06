import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import FullViewLoader from '@/components/ui/loader/FullViewLoader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext } from '@/context/expense/ExpenseCreationContext';
import useCreateGroupAttachment from '@/hooks/attachment/UseCreateGroupAttachment';
import useCreateExpense from '@/hooks/expense/UseCreateExpense';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function NewExpenseMessage() {
  const { t } = useTranslation();
  const { expenseCreation, setExpenseCreation } = useContext(ExpenseCreationContext);

  const {
    mutate: createExpense,
    isPending: isExpenseCreationPending,
    isIdle: isExpenseCreationIdle,
  } = useCreateExpense();
  const {
    mutate: createAttachment,
    isPending: isAttachmentCreationPending,
    isSuccess: isAttachmentCreationSuccess,
  } = useCreateGroupAttachment(
    expenseCreation.groupId,
    expenseCreation.attachment!,
    (id: string) => setExpenseCreation({ ...expenseCreation, attachmentId: id }),
    () => router.push('/expenses/new/error-modal'),
  );

  const isCreationPending =
    isExpenseCreationPending ||
    isAttachmentCreationPending ||
    (isExpenseCreationIdle && isAttachmentCreationSuccess);

  useEffect(() => {
    if (isAttachmentCreationSuccess) {
      createExpense();
    }
  }, [isAttachmentCreationSuccess]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isCreationPending);
    return () => backHandler.remove();
  }, [isCreationPending]);

  function create() {
    if (expenseCreation.attachment) {
      createAttachment();
    } else {
      createExpense();
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
                setExpenseCreation({ ...expenseCreation, message });
              }}
              value={expenseCreation.message ?? ''}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton onPress={create} title={t('Create expense')} />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
