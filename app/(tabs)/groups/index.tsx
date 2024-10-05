import { router } from 'expo-router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { CustomButton } from '@/components';
import ActivityListItem from '@/components/modules/activity/ActivityListItem';
import NavBar from '@/components/ui/bar/NavBar';
import SafeView from '@/components/ui/box/SafeView';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useActivities from '@/hooks/activity/UseActivities';
import useGroup from '@/hooks/group/UseGroup';
import { IconSize } from '@/util/IconSize';

export default function Index() {
  const { t } = useTranslation();
  const { userData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);
  const { data: activities } = useActivities(userData.currentGroupId);

  const currentGroupView = groupDetails ? (
    <View className="flex-1 space-y-3">
      <SingleClickTouchableOpacity onPress={() => router.push('/groups/list')}>
        <View pointerEvents="none">
          <SelectInput
            label={t('Current group')}
            value={{
              name: groupDetails.name,
              value: groupDetails.name,
              isDisabled: false,
            }}
          />
        </View>
      </SingleClickTouchableOpacity>
      <View className="flex-1">
        {activities ? (
          activities.activities.length > 0 ? (
            <ScrollView className="space-y-2" showsVerticalScrollIndicator={false}>
              {activities.activities.toReversed().map((activity, index) => (
                <View key={index}>
                  <ActivityListItem
                    groupId={activities.groupId}
                    activity={activity}
                    onPress={() => {
                      switch (activity.type) {
                        case 'EXPENSE': {
                          router.push(`/expenses/${activity.activityId}`);
                          break;
                        }
                        case 'PAYMENT': {
                          router.push(`/payments/${activity.activityId}`);
                          break;
                        }
                      }
                    }}
                  />
                </View>
              ))}
              <View />
            </ScrollView>
          ) : (
            <View className="py-8">
              <NavBar title={t("Oops, you don't have any activities!")} type="normal" />
            </View>
          )
        ) : (
          <Loader />
        )}
      </View>
    </View>
  ) : (
    <Loader />
  );

  const noGroupView = (
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
  );

  return (
    <SafeView type="wide">
      <View className="w-full h-full pt-8">
        {userData.currentGroupId ? (
          currentGroupView
        ) : userData.currentGroupId === null ? (
          noGroupView
        ) : (
          <Loader />
        )}
      </View>
    </SafeView>
  );
}
