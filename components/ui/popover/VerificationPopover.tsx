import React from 'react';
import { Modal, Text, View } from 'react-native';

import { CustomButton, CustomTextInput, Loader } from '@/components';
import CustomValidatedLinkTextInput from '@/components/ui/text-input/CustomValidatedLinkTextInput';

interface CustomDecisionPopoverProps {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
  disabled?: boolean;
  label: string;
  onChangeText: (text: string) => void;
  linkLabel?: string;
  onLinkPress?: () => void;
  secondButtonTitle: string;
  secondOnPress: () => void;
  isPending: boolean;
  error: boolean;
  errorText: string;
}

const VerificationPopover: React.FC<CustomDecisionPopoverProps> = ({
  title,
  description,
  buttonTitle,
  onPress,
  disabled = false,
  label,
  onChangeText,
  linkLabel,
  onLinkPress,
  secondButtonTitle,
  secondOnPress,
  isPending,
  error,
  errorText,
}) => {
  return (
    <Modal transparent>
      <View className=" w-full h-full flex-col justify-center items-center">
        <Loader isLoading={isPending} />
        <View className="absolute w-full h-full opacity-70 bg-ink-darkest" />
        <View className="bg-sky-lightest w-[327px] h-[420px] p-[24px] justify-between rounded-2xl">
          <View className="flex-col justify-start items-start gap-2 flex">
            <Text className="font-bold text-title3 text-ink-darkest text-center w-full">
              {title}
            </Text>
            <Text className="font-thin text-regular text-ink-lighter text-center w-full">
              {description}
            </Text>
          </View>
          <View>
            {linkLabel === undefined || onLinkPress === undefined ? (
              <CustomTextInput label={label} onChangeText={(text) => onChangeText(text)} />
            ) : (
              <CustomValidatedLinkTextInput
                label={label}
                onChangeText={(text) => onChangeText(text)}
                linkLabel={linkLabel}
                onPress={onLinkPress}
                error={error}
                errorText={errorText}
              />
            )}
          </View>
          <View className="gap-y-6">
            <View className="w-full">
              <CustomButton onPress={onPress} title={buttonTitle} disabled={disabled} />
            </View>
            <View className="w-full">
              <CustomButton onPress={secondOnPress} title={secondButtonTitle} type="reversed" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerificationPopover;