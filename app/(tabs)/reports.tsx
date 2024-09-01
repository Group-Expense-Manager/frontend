import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomSwitch from '@/components/ui/switch/CustomSwitch';
import BaseTextInput from '@/components/ui/text-input/BaseTextInput';
import PhoneTextInput from '@/components/ui/text-input/PhoneTextInput';

export default function Reports() {
  const { t } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [textValue2, setTextValue2] = useState('');
  const [textValue3, setTextValue3] = useState('');
  const [textValue4, setTextValue4] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNumberChange = (text: string) => {
    setTextValue2(text);
    if (parseInt(text, 10) > 100) {
      setErrorMessage(
        'This field is required also This field is required also This field is required also',
      );
    } else {
      setErrorMessage('');
    }
  };

  const handleLinkPress = () => {
    console.log('Link pressed');
  };

  const { toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 justify-center">
      <CustomSwitch defaultValue onValueChange={() => toggleColorScheme()} />
      <View className="flex-col justify-center items-center">
        <Text className="text-center">{t('Reports')}</Text>
        <Text>Enter some text:</Text>
        <PhoneTextInput
          value={textValue}
          onChangeText={setTextValue}
          linkLabel={{
            label: 'Forgot password? - Forgot password? - Forgot password? - Forgot password?',
            onPress: handleLinkPress,
          }}
        />
        <Text>{textValue}</Text>
        <BaseTextInput
          valueType="number"
          value={textValue2}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={handleNumberChange}
          errorMessage={errorMessage}
          linkLabel={{
            label: 'Forgot password? - Forgot password? - Forgot password? - Forgot password?',
            onPress: handleLinkPress,
          }}
        />
        <Text>{textValue2}</Text>
        <BaseTextInput
          valueType="multiline"
          value={textValue3}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={setTextValue3}
        />
        <Text>{textValue3}</Text>
        <BaseTextInput
          valueType="multiline"
          value={textValue4}
          label="My Label"
          placeholder="Enter text here"
          onChangeText={setTextValue4}
          disabled
        />
        <Text>{textValue4}</Text>
      </View>
    </SafeAreaView>
  );
}
