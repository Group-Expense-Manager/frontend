import * as SecureStore from 'expo-secure-store';
import i18n from 'i18next';
import { useColorScheme } from 'nativewind';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { SelectList } from '@/components';
import SafeView from '@/components/ui/box/SafeView';
import CustomCheckbox from '@/components/ui/checkbox/CustomCheckbox';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomSwitch from '@/components/ui/switch/CustomSwitch';
import CustomTable from '@/components/ui/table/CustomTable';
import { LANGUAGE_KEY, MODE_KEY } from '@/constants/Storage';
import { GlobalContext } from '@/context/GlobalContext';

export default function Preferences() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { preferences, setPreferences } = useContext(GlobalContext);
  const [isSwitchOn, setSwitchOn] = useState(colorScheme === 'dark');
  const [isCheckboxChecked, setCheckboxChecked] = useState(preferences.mode === 'system');

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

  async function setLanguage(rawLanguage: string) {
    const language: 'pl' | 'en' = rawLanguage === 'pl' || rawLanguage === 'en' ? rawLanguage : 'en';
    preferences.language = language;
    await i18n.changeLanguage(language);
    SecureStore.setItem(LANGUAGE_KEY, language);
  }

  return (
    <SafeView>
      <>
        <CustomHeader title={t('Preferences')} />
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
          <SelectList
            name={t('Language')}
            setSelected={setLanguage}
            data={[
              { key: 'en', value: `${t('English')}` },
              { key: 'pl', value: `${t('Polish')}` },
            ]}
          />
        </View>
      </>
    </SafeView>
  );
}
