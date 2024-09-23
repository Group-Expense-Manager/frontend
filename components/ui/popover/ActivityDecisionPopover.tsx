import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ButtonColor } from '@/components/ui/button/CustomButton';
import IconButton from '@/components/ui/button/IconButton';
import DoubleButtonPopover from '@/components/ui/popover/DoubleButtonPopover';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { CheckIcon, CloseIcon } from '@/constants/Icon';
import { ButtonType } from '@/util/ButtonType';

interface ActivityDecisionPopoverProps {
  title: string;
  description: string;
  onConfirmPress: () => void;
  message?: string;
  onMessageChange: (text: string) => void;
  decision: 'ACCEPT' | 'REJECT' | undefined;
  onAcceptPress: () => void;
  onRejectPress: () => void;
  isLoading: boolean;
}

const ActivityDecisionPopover: React.FC<ActivityDecisionPopoverProps> = ({
  title,
  description,
  onConfirmPress,
  message,
  onMessageChange,
  decision,
  onAcceptPress,
  onRejectPress,
  isLoading,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const middleSection = (
    <View className="space-y-4">
      <View className="flex-row justify-center items-center space-x-4">
        <View>
          <IconButton
            icon={<CheckIcon />}
            onPress={onAcceptPress}
            color={ButtonColor.GREEN}
            type={decision === 'ACCEPT' ? ButtonType.NORMAL : ButtonType.OUTLINED}
          />
        </View>
        <View>
          <IconButton
            icon={<CloseIcon />}
            onPress={onRejectPress}
            color={ButtonColor.RED}
            type={decision === 'REJECT' ? ButtonType.NORMAL : ButtonType.OUTLINED}
          />
        </View>
      </View>
      <View>
        <MultiTextInput
          label={t('Message (optional)')}
          value={message}
          onChangeText={onMessageChange}
        />
      </View>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal', headerShown: false });
  }, [navigation]);

  return (
    <DoubleButtonPopover
      title={title}
      description={description}
      middleSection={middleSection}
      firstButtonProps={{ title: t('Confirm'), onPress: onConfirmPress, disabled: !decision }}
      secondButtonProps={{ title: t('Cancel'), onPress: router.back, type: ButtonType.OUTLINED }}
      isLoading={isLoading}
    />
  );
};

export default ActivityDecisionPopover;
