import { router, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { useColorScheme } from 'nativewind';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomSwitch from '@/components/ui/switch/CustomSwitch';
import CustomTable from '@/components/ui/table/CustomTable';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { LANGUAGE_KEY, MODE_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

export default function Preferences() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { preferences, setPreferences } = useContext(GlobalContext);
  const [isSwitchOn, setSwitchOn] = useState(colorScheme === 'dark');
  const [isCheckboxChecked, setCheckboxChecked] = useState(preferences.mode === 'system');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(preferences.language);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader title={t('Preferences')} />,
    });
  }, [navigation, t('Preferences')]);

  const hasPageBeenRendered = useRef({
    checkbox: false,
    switch: false,
    colorScheme: false,
    preferences: false,
  });

  useEffect(() => {
    if (hasPageBeenRendered.current['checkbox']) {
      if (isCheckboxChecked) {
        setPreferences({ ...preferences, mode: 'system' });
        setColorScheme('system');
      } else {
        setPreferences({ ...preferences, mode: colorScheme });
      }
    }
    hasPageBeenRendered.current['checkbox'] = true;
  }, [isCheckboxChecked]);

  useEffect(() => {
    if (hasPageBeenRendered.current['colorScheme']) {
      if (isCheckboxChecked) {
        setSwitchOn(colorScheme === 'dark');
      }
    }

    hasPageBeenRendered.current['colorScheme'] = true;
  }, [colorScheme]);

  useEffect(() => {
    if (hasPageBeenRendered.current['switch']) {
      if (!isCheckboxChecked) {
        const scheme = isSwitchOn ? 'dark' : 'light';
        setColorScheme(scheme);
        setPreferences({ ...preferences, mode: scheme });
      }
    }
    hasPageBeenRendered.current['switch'] = true;
  }, [isSwitchOn]);

  useEffect(() => {
    if (hasPageBeenRendered.current['preferences']) {
      SecureStore.setItem(MODE_KEY, preferences.mode);
    }
    hasPageBeenRendered.current['preferences'] = true;
  }, [preferences.mode]);

  async function setLanguage(language: string) {
    await i18n.changeLanguage(language);
    setSelectedLanguage(language);
    preferences.language = i18n.language;
    SecureStore.setItem(LANGUAGE_KEY, i18n.language);
  }

  const languages = () => {
    return [
      { value: 'en', name: `${t('en')}` },
      { value: 'pl', name: `${t('pl')}` },
    ];
  };

  const isSwitchDisabled = preferences.mode === 'system';

  return (
    <Box>
      <View className="py-[32px] w-full flex flex-col items-center ">
        <SingleClickTouchableOpacity
          delay={500}
          activeOpacity={1}
          onPress={() => setCheckboxChecked(!isCheckboxChecked)}>
          <CustomTable title={t('Use system theme')}>
            <CustomCheckbox value={isCheckboxChecked} />
          </CustomTable>
        </SingleClickTouchableOpacity>
        <SingleClickTouchableOpacity
          delay={500}
          activeOpacity={1}
          onPress={() => setSwitchOn(!isSwitchOn)}
          disabled={isSwitchDisabled}>
          <CustomTable title={t('Dark mode')}>
            <CustomSwitch disabled={isSwitchDisabled} value={isSwitchOn} />
          </CustomTable>
        </SingleClickTouchableOpacity>
        <SelectInput
          onSelect={setLanguage}
          onPress={() => router.navigate('/you/language-select')}
          label={t('Language')}
          value={selectedLanguage}
          data={languages()}
        />
      </View>
    </Box>
  );
}
