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
import { ExpenseUpdateContext } from '@/context/expense/ExpenseUpdateContext';
import useCreateGroupAttachment from '@/hooks/attachment/UseCreateGroupAttachment';
import useUpdateGroupAttachment from '@/hooks/attachment/UseUpdateGroupAttachment';
import useUpdateExpense from '@/hooks/expense/UseUpdateExpense';
import { ButtonType } from '@/util/ButtonType';
import { IconSize } from '@/util/IconSize';

export default function EditExpenseMessage() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ expenseId: string }>();

  const { userData } = useContext(GlobalContext);

  const { expenseUpdate, setExpenseUpdate } = useContext(ExpenseUpdateContext);

  const {
    mutate: updateExpense,
    isPending: isExpenseUpdatePending,
    isIdle: isExpenseUpdateIdle,
  } = useUpdateExpense(userData.currentGroupId!, params.expenseId);

  const {
    mutate: createAttachment,
    isPending: isAttachmentCreationPending,
    isSuccess: isAttachmentCreationSuccess,
  } = useCreateGroupAttachment(
    userData.currentGroupId!,
    expenseUpdate.newAttachment!,
    (id: string) => setExpenseUpdate({ ...expenseUpdate, newAttachmentId: id }),
    () => router.push(`/expenses/${params.expenseId}/edit/error-modal`),
  );

  const {
    mutate: updateAttachment,
    isPending: isAttachmentUpdatePending,
    isSuccess: isAttachmentUpdateSuccess,
  } = useUpdateGroupAttachment(
    userData.currentGroupId!,
    expenseUpdate.newAttachment!,
    expenseUpdate?.oldAttachmentId!,
    (id: string) => setExpenseUpdate({ ...expenseUpdate, newAttachmentId: id }),
    () => router.push(`/expenses/${params.expenseId}/edit/error-modal`),
  );

  const isUpdatePending =
    isExpenseUpdatePending ||
    isAttachmentCreationPending ||
    isAttachmentUpdatePending ||
    (isExpenseUpdateIdle && (isAttachmentCreationSuccess || isAttachmentUpdateSuccess));

  useEffect(() => {
    if (isAttachmentCreationSuccess || isAttachmentUpdateSuccess) {
      updateExpense();
    }
  }, [isAttachmentCreationSuccess, isAttachmentUpdateSuccess]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isUpdatePending);
    return () => backHandler.remove();
  }, [isUpdatePending]);

  function update() {
    if (!expenseUpdate.oldAttachment && expenseUpdate.newAttachment) {
      createAttachment();
    } else if (
      expenseUpdate.newAttachment &&
      expenseUpdate.oldAttachment &&
      expenseUpdate.newAttachment.uri !== expenseUpdate.oldAttachment.uri
    ) {
      updateAttachment();
    } else {
      updateExpense();
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
                setExpenseUpdate({ ...expenseUpdate, message });
              }}
              value={expenseUpdate.message ?? ''}
            />
          </View>
        </View>

        <View className="py-8 w-full flex flex-col justify-center items-center space-y-8">
          <View className="w-full">
            <CustomButton onPress={() => update()} title={t('Edit expense')} />
          </View>
          <View className="w-full">
            <CustomButton onPress={router.back} title={t('Back')} type={ButtonType.OUTLINED} />
          </View>
        </View>
      </View>
    </Box>
  );
}
