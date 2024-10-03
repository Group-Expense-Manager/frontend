import { router, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { useColorScheme } from 'nativewind';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Box from '@/components/ui/box/Box';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomSwitch from '@/components/ui/switch/CustomSwitch';
import CustomTable from '@/components/ui/table/CustomTable';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { LANGUAGE_KEY, MODE_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';
import { SelectInputData } from '@/context/utils/SelectInputContext';

export default function Preferences() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { preferences, setPreferences } = useContext(GlobalContext);
  const [isSwitchOn, setSwitchOn] = useState(colorScheme === 'dark');
  const [isCheckboxChecked, setCheckboxChecked] = useState(preferences.mode === 'system');
  const [selectedLanguage, setSelectedLanguage] = useState<SelectInputData<string>>({
    value: preferences.language,
    name: t(preferences.language),
  });

  const navigation = useNavigation();

  useEffect(() => {
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
    setSelectedLanguage({ value: language, name: t(language) });
    preferences.language = i18n.language;
    SecureStore.setItem(LANGUAGE_KEY, i18n.language);
  }

  return (
    <Box>
      <View className="py-[32px] w-full flex flex-col items-center ">
        <CustomTable title={t('Use system theme')}>
          <CustomCheckbox
            value={isCheckboxChecked}
            onValueChange={() => setCheckboxChecked(!isCheckboxChecked)}
          />
        </CustomTable>
        <CustomTable title={t('Dark mode')}>
          <CustomSwitch
            disabled={preferences.mode === 'system'}
            value={isSwitchOn}
            onValueChange={() => setSwitchOn(!isSwitchOn)}
          />
        </CustomTable>
        <SelectInput
          onSelect={setLanguage}
          onPress={() => router.navigate('/you/language-select')}
          label={t('Language')}
          value={selectedLanguage}
        />
      </View>
    </Box>
  );
}
