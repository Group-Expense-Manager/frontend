import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { CustomButton } from '@/components';
import NavBar from '@/components/ui/bar/NavBar';
import SafeView from '@/components/ui/box/SafeView';
import Loader from '@/components/ui/loader/Loader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useGroup from '@/hooks/group/UseGroup';
import { IconSize } from '@/util/IconSize';

export default function Index() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);

  return (
    <SafeView>
      <View className="w-full h-full py-8">
        {userData.currentGroupId ? (
          groupDetails ? (
            <TouchableOpacity onPress={() => router.push('/groups/list')}>
              <View pointerEvents="none">
                <MultiTextInput label={t('Current group')} value={groupDetails.name} />
              </View>
            </TouchableOpacity>
          ) : (
            <Loader />
          )
        ) : userData.currentGroupId === null ? (
          <View className="w-full h-full flex-col">
            <View className="w-full flex justify-center items-center">
              <LogoIcon width={IconSize.COLOSSAL} height={IconSize.COLOSSAL} />
            </View>
            <View className="flex-1 justify-between">
              <View className="py-8">
                <NavBar title={t("You don't belong to any group!")} type="normal" />
              </View>
              <View className="space-y-8 py-8">
                <View>
                  <CustomButton
                    title={t('Create group')}
                    onPress={() => router.push('/groups/new/group-name')}
                  />
                </View>
                <View>
                  <CustomButton
                    title={t('Join group')}
                    onPress={() => router.push('/groups/join-first-group-modal')}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </SafeView>
  );
}
