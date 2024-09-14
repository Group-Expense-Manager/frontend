import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import SafeView from '@/components/ui/box/SafeView';
import Loader from '@/components/ui/loader/Loader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { GlobalContext } from '@/context/GlobalContext';
import useGroup from '@/hooks/group/UseGroup';

export default function Groups() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);

  return (
    <SafeView>
      <View className="py-8">
        {userData.currentGroupId &&
          (groupDetails ? (
            <TouchableOpacity onPress={() => router.push('/groups/list')}>
              <View pointerEvents="none">
                <MultiTextInput label={t('Current group')} value={groupDetails.name} />
              </View>
            </TouchableOpacity>
          ) : (
            <Loader />
          ))}
      </View>
    </SafeView>
  );
}
