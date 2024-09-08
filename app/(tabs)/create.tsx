import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CreationButton from '@/components/ui/button/CreationButton';
import { BankNoteIcon, FileIcon, ScalesIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';

export default function Create() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);

  return (
    <SafeView>
      <View className=" w-full h-full flex-col justify-between pb-8 pt-4">
        <View>
          <CreationButton
            onPress={() => router.navigate('/expense-group')}
            title={t('Add expense')}
            icon={<BankNoteIcon />}
            disabled={!userData.currentGroupId}
          />
        </View>

        <View>
          <CreationButton
            onPress={() => {}}
            title={t('Add payment')}
            icon={<ScalesIcon />}
            disabled={!userData.currentGroupId}
          />
        </View>

        <View>
          <CreationButton
            onPress={() => {}}
            title={t('Add report')}
            icon={<FileIcon />}
            disabled={!userData.currentGroupId}
          />
        </View>
      </View>
    </SafeView>
  );
}
