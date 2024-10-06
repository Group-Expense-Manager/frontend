import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import CreationButton from '@/components/ui/button/CreationButton';
import Loader from '@/components/ui/loader/Loader';
import { BankNoteIcon, FileIcon, ScalesIcon } from '@/constants/Icon';
import useGroups from '@/hooks/group/UseGroups';

export default function Create() {
  const { t } = useTranslation();
  const { data: groups } = useGroups();

  return (
    <SafeView type="wide">
      {groups === undefined ? (
        <Loader />
      ) : (
        <View className="w-full h-full flex-col justify-between py-4">
          <View>
            <CreationButton
              onPress={() => router.push('/expenses/new/group')}
              title={t('Create expense')}
              icon={<BankNoteIcon />}
              disabled={!groups.length}
            />
          </View>

          <View>
            <CreationButton
              onPress={() => router.push('/payments/new/group')}
              title={t('Create payment')}
              icon={<ScalesIcon />}
              disabled={!groups.length}
            />
          </View>

          <View>
            <CreationButton
              onPress={() => {}}
              title={t('Create report')}
              icon={<FileIcon />}
              disabled={!groups.length}
            />
          </View>
        </View>
      )}
    </SafeView>
  );
}
