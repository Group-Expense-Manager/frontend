import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import { TabButton, TabIcon, TopTabButton, TopTabIcon } from '@/components';
import theme from '@/constants/Colors';
import { CreditCardIcon, FileAttachmentIcon, GroupIcon, PlusIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useUserDetails from '@/hooks/userdetails/UseUserDetails';

const TabLayout = () => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { authState } = useContext(GlobalContext);
  const { data: userDetails } = useUserDetails();
  const { data: profilePicture } = useProfilePicture(authState.userId!, userDetails?.attachmentId);

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    return <TabButton {...props} />;
  };

  const topTabBarButton = (props: BottomTabBarButtonProps) => {
    return <TopTabButton {...props} />;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colorScheme === 'light' ? theme.sky.lightest : theme.ink.darker,
          shadowColor: colorScheme === 'light' ? theme.ink.darkest : '',
          shadowOffset: { width: 0, height: -2 },
          height: 60,
        },
      }}>
      <Tabs.Screen
        name="reports"
        options={{
          title: t('Reports'),
          tabBarButton,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={t('Reports')} focused={focused}>
              <FileAttachmentIcon />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: t('Groups'),
          tabBarButton,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={t('Groups')} focused={focused}>
              <GroupIcon />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarButton: topTabBarButton,
          tabBarIcon: ({ focused }) => (
            <TopTabIcon focused={focused}>
              <PlusIcon />
            </TopTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="alignments"
        options={{
          title: t('Alignments'),
          tabBarButton,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={t('Alignments')} focused={focused}>
              <CreditCardIcon />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: t('You'),
          tabBarButton,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name={t('You')} focused={focused}>
              <Image source={profilePicture} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
