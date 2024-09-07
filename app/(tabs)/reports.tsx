import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import NumericTextInput from '@/components/ui/text-input/NumericTextInput';
import SingleTextInput from '@/components/ui/text-input/SingleTextInput';
import SelectInput from '@/components/ui/text-input/select/SelectInput';

export default function Reports() {
  const { t } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [textValue2, setTextValue2] = useState('');
  const [textValue3, setTextValue3] = useState('32');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleNumberChange = (text: string) => {
    setTextValue2(text);
    if (parseInt(text, 10) > 100) {
      setErrorMessages([
        'This field is required also This field is required also This field is required also',
        'Next Error message',
        'Next Error message',
        'Next Error message',
        'Next Error message',
        'Next Error message',
        'Next Error message',
        'Next Error message',
      ]);
    } else {
      setErrorMessages([]);
    }
  };

  const handleLinkPress = () => {
    console.log('Link pressed');
  };

  const { toggleColorScheme } = useColorScheme();

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
        <SingleTextInput
          value={textValue}
          onChangeText={setTextValue}
          linkLabel={{
            label: 'Forgot password? - Forgot password? - Forgot password? - Forgot password?',
            onPress: handleLinkPress,
          }}
          label="My Label"
          placeholder="Enter text here"
        />
        <Text>{textValue}</Text>
        <NumericTextInput
          value={textValue2}
          onChangeText={handleNumberChange}
          errorMessages={errorMessages}
          label="My Label"
          placeholder="Enter text here"
          linkLabel={{
            label: 'Forgot password? - Forgot password? - Forgot password? - Forgot password?',
            onPress: handleLinkPress,
          }}
        />
        <Text>{textValue2}</Text>
        <MultiTextInput
          disabled={false}
          value={textValue3}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={setTextValue3}
        />
        <Text>{textValue3}</Text>
        <MultiTextInput
          value={textValue2}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={setTextValue2}
          disabled
        />
        <MultiTextInput
          value={textValue3}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={setTextValue3}
          disabled
        />
      </View>
    </SafeAreaView>
  );
}
