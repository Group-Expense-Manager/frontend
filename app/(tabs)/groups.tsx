import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { GlobalContext } from '@/context/GlobalContext';

export default function Groups() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);

  return (
    <SafeView>
      <View className="py-8">
        <TouchableOpacity onPress={() => router.push('/my-groups')}>
          <View pointerEvents="none">
            <MultiTextInput
              label={t('Current group')}
              value={userData.currentGroup === undefined ? '' : userData.currentGroup.name}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}
