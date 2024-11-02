import { router } from 'expo-router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, View } from 'react-native';

import ActivityListItem from '@/components/modules/activity/ActivityListItem';
import UserBalance from '@/components/modules/balance/UserBalance';
import SettlementListItem from '@/components/modules/settlements/SettlementListItem';
import NavBar from '@/components/ui/bar/NavBar';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Loader from '@/components/ui/loader/Loader';
import CustomRefreshControl from '@/components/ui/refreshcontrol/CustomRefreshControl';
import SegmentedControls from '@/components/ui/segmetedcontrols/SegmentedControls';
import ChipSelectInput from '@/components/ui/text-input/select/ChipSelectInput';
import GroupSelectInput from '@/components/ui/text-input/select/GroupSelectInput';
import SingleClickTouchableOpacity from '@/components/ui/touchableopacity/SingleClickTouchableOpacity';
import { LogoIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { Currency } from '@/hooks/currency/UseAvailableCurrencies';
import useActivities, { ActivityListElement } from '@/hooks/finance/UseActivities';
import useBalances, { Balance } from '@/hooks/finance/UseBalances';
import useSettlements, { Settlement } from '@/hooks/finance/UseSettlements';
import useGroup, { GroupDetails } from '@/hooks/group/UseGroup';
import useGroups from '@/hooks/group/UseGroups';
import useGroupMembersDetails, {
  GroupMemberDetails,
} from '@/hooks/userdetails/UseGroupMembersDetails';
import { IconSize } from '@/util/IconSize';

type BalanceWithDetails = {
  balance: Balance;
  details: GroupMemberDetails;
};

type SettlementWithDetails = {
  settlement: Settlement;
  fromUserDetails: GroupMemberDetails;
  toUserDetails: GroupMemberDetails;
};

export default function Index() {
  const { t } = useTranslation();
  const { authState, userData, setUserData } = useContext(GlobalContext);
  const { data: groupDetails } = useGroup(userData.currentGroupId);
  const { data: userGroups, status: userGroupsStatus } = useGroups();

  useEffect(() => {
    if (userGroupsStatus === 'success' && !userData.currentGroupId) {
      setUserData({
        currentGroupId: !userGroups.length ? null : userGroups[0].groupId,
      });
    }
  }, [userGroupsStatus, userData.currentGroupId]);

  const { data: activities, refetch: refetchActivities } = useActivities(userData.currentGroupId);

  const [refreshingActivities, setRefreshingActivities] = React.useState(false);

  const onRefreshActivities = React.useCallback(() => {
    setRefreshingActivities(true);
    refetchActivities().then(() => setRefreshingActivities(false));
  }, []);

  const { data: balances, refetch: refetchBalances } = useBalances(userData.currentGroupId);

  const [refreshingBalances, setRefreshingBalances] = React.useState(false);

  const onRefreshBalances = React.useCallback(() => {
    setRefreshingBalances(true);
    refetchBalances().then(() => setRefreshingBalances(false));
  }, []);

  const { data: settlements, refetch: refetchSettlements } = useSettlements(
    userData.currentGroupId,
  );

  const [refreshingSettlements, setRefreshingSettlements] = React.useState(false);

  const onRefreshSettlements = React.useCallback(() => {
    setRefreshingSettlements(true);
    refetchSettlements().then(() => setRefreshingSettlements(false));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: groupMembersDetails } = useGroupMembersDetails(userData.currentGroupId!);

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({ code: '' });

  const groupCurrencies = () => {
    return groupDetails?.groupCurrencies.map((currency) => {
      return { value: currency, name: currency.code };
    });
  };

  useEffect(() => {
    if (groupDetails) {
      setSelectedCurrency(groupDetails.groupCurrencies[0]);
    }
  }, [groupDetails]);

  const getGroupsDetailsList = (groupDetails?: GroupDetails) => {
    if (!groupDetails) return [];
    return [
      {
        name: groupDetails.name,
        value: groupDetails,
      },
    ];
  };

  const handleActivityPress = (activity: ActivityListElement) => {
    switch (activity.type) {
      case 'EXPENSE': {
        router.push(`/expenses/${activity.activityId}`);
        break;
      }
      case 'PAYMENT': {
        router.push(`/payments/${activity.activityId}`);
        break;
      }
      default:
        break;
    }
  };

  const activitiesView = (
    <View className="flex-1">
      {activities && groupMembersDetails ? (
        activities.activities.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <CustomRefreshControl
                refreshing={refreshingActivities}
                onRefresh={onRefreshActivities}
              />
            }
            data={activities.activities.toReversed()}
            keyExtractor={(item) => item.activityId}
            renderItem={({ item: activity }) => (
              <View className="mb-2">
                <ActivityListItem
                  activity={activity}
                  onPress={() => handleActivityPress(activity)}
                  groupMembersDetails={groupMembersDetails}
                />
              </View>
            )}
            initialNumToRender={7}
            maxToRenderPerBatch={5}
          />
        ) : (
          <View className="py-8">
            <NavBar title={t("Oops, you don't have any activities!")} type="normal" />
          </View>
        )
      ) : (
        <Loader />
      )}
    </View>
  );

  const findUserDetails = (userId: string) =>
    groupMembersDetails?.details.find((it) => it.id === userId);

  const balancesWithDetails = balances?.balances
    .find((it) => it.currency === selectedCurrency.code)
    ?.userBalances.reduce<BalanceWithDetails[]>((acc, balance) => {
      const details = findUserDetails(balance.userId);
      if (details) {
        acc.push({ balance, details });
      }
      return acc;
    }, []);

  const balancesView = (
    <View className="flex-1">
      {balancesWithDetails ? (
        <ScrollView
          className="space-y-2"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <CustomRefreshControl refreshing={refreshingBalances} onRefresh={onRefreshBalances} />
          }>
          {balancesWithDetails.map((balanceWithDetails, index) => (
            <View key={index}>
              <UserBalance
                balance={balanceWithDetails.balance}
                userDetails={balanceWithDetails.details}
                currency={selectedCurrency.code}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Loader />
      )}
    </View>
  );

  const settlementsWithDetails = settlements?.settlements
    .find((it) => it.currency === selectedCurrency.code)
    ?.settlements.reduce<SettlementWithDetails[]>((acc, settlement) => {
      const fromUserDetails = findUserDetails(settlement.fromUserId);
      const toUserDetails = findUserDetails(settlement.toUserId);

      if (fromUserDetails && toUserDetails) {
        acc.push({ settlement, fromUserDetails, toUserDetails });
      }
      return acc;
    }, []);

  const settlementsView = (
    <View className="flex-1">
      {settlementsWithDetails ? (
        settlementsWithDetails.length > 0 ? (
          <ScrollView
            className="space-y-2"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <CustomRefreshControl
                refreshing={refreshingSettlements}
                onRefresh={onRefreshSettlements}
              />
            }>
            {settlementsWithDetails.map((settlementWithDetails, index) => (
              <View key={index}>
                <SettlementListItem
                  fromUserDetails={settlementWithDetails.fromUserDetails}
                  toUserDetails={settlementWithDetails.toUserDetails}
                  value={settlementWithDetails.settlement.value}
                  currency={selectedCurrency.code}
                  onPress={
                    authState.userId === settlementWithDetails.fromUserDetails.id
                      ? () => {
                          router.push(
                            `/payments/new/group?recipientId=${settlementWithDetails.toUserDetails.id}&currency=${selectedCurrency.code}&value=${settlementWithDetails.settlement.value}`,
                          );
                        }
                      : undefined
                  }
                />
              </View>
            ))}
            <View />
          </ScrollView>
        ) : (
          <View className="py-8">
            <NavBar title={t('No suggested settlements!')} type="normal" />
          </View>
        )
      ) : (
        <Loader />
      )}
    </View>
  );

  function setView(index: number): ReactNode {
    switch (index) {
      case 0:
        return activitiesView;
      case 1:
        return balancesView;
      default:
        return settlementsView;
    }
  }

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
    <Box type="wide">
      <View className="w-full h-full pt-4">
        {userData.currentGroupId ? (
          groupDetails ? (
            <View className="flex-1 space-y-3">
              <SingleClickTouchableOpacity onPress={() => router.push('/groups/list')}>
                <View pointerEvents="none">
                  <GroupSelectInput
                    label={t('Current group')}
                    value={groupDetails}
                    data={getGroupsDetailsList(groupDetails)}
                  />
                </View>
              </SingleClickTouchableOpacity>
              <View>
                <SegmentedControls
                  activeSegmentIndex={currentIndex}
                  onValueChange={setCurrentIndex}
                  segments={[
                    { text: t('Activities') },
                    { text: t('Balances') },
                    { text: t('Settlements') },
                  ]}
                />
              </View>
              {currentIndex !== 0 && (
                <View className=" items-start">
                  <ChipSelectInput
                    onSelect={setSelectedCurrency}
                    onPress={() => router.navigate('/groups/group-currency-select')}
                    value={selectedCurrency}
                    data={groupCurrencies()}
                  />
                </View>
              )}
              {setView(currentIndex)}
            </View>
          ) : (
            <Loader />
          )
        ) : userData.currentGroupId === null ? (
          noGroupView
        ) : (
          <Loader />
        )}
      </View>
    </Box>
  );
}
