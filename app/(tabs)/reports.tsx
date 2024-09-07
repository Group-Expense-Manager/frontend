import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectInput from '@/components/ui/text-input/select/SelectInput';

export default function Reports() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="flex-col justify-center items-center">
        <Text className="text-center">{t('Reports')}</Text>
        <Text>Enter some text:</Text>
        <SelectInput
          data={[
            { value: 1, name: 'One' },
            { value: 2, name: 'Two' },
            { value: 3, name: 'Three' },
          ]}
          onSelect={(value) => console.log(value)}
          label="My Label"
          showErrors={false}
        />
      </View>
    </SafeAreaView>
  );
}
