import { useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useLayoutEffect } from 'react';
import { Modal, Text, View } from 'react-native';

import { FullViewLoader } from '@/components';

interface BasicPopoverProps {
  title: string;
  description: string;
  middleSection?: React.ReactNode;
  bottomSection?: React.ReactNode;
  isLoading?: boolean;
}

const BasicPopover: React.FC<BasicPopoverProps> = ({
  title,
  description,
  middleSection,
  bottomSection,
  isLoading = false,
}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal', animation: 'fade' });
  }, [navigation]);

  return (
    <Modal transparent statusBarTranslucent>
      <FullViewLoader isLoading={isLoading} />
      <View className=" w-full h-full flex-col justify-center items-center">
        <View className="absolute w-full h-full opacity-70 bg-ink-darkest" />
        <View className="bg-sky-lightest dark:bg-ink-darker w-[85%] min-h-[300px] p-6 justify-between rounded-2xl space-y-10">
          <View>
            <Text className="font-bold text-title3 text-ink-darkest dark:text-sky-lightest text-center w-full">
              {title}
            </Text>
            <Text className="font-thin text-regular text-ink-lighter dark:text-sky-dark text-center w-full">
              {description}
            </Text>
          </View>
          {!!middleSection && <View>{middleSection}</View>}
          {!!bottomSection && <View>{bottomSection}</View>}
        </View>
      </View>
    </Modal>
  );
};

export default BasicPopover;
