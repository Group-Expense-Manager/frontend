import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabButton, TabIcon, TopTabButton, TopTabIcon } from '@/components';
import theme from '@/constants/Colors';
import {
  CreditCardIcon,
  FileAttachmentIcon,
  GroupIcon,
  PlusIcon,
  UserIcon,
} from '@/constants/Icon';
import { GroupProvider } from '@/context/GroupContext';

const TabLayout = () => {
  const { t } = useTranslation();

  NavigationBar.setPositionAsync('relative');
  NavigationBar.setBackgroundColorAsync(theme.sky.lightest);

  return (
    <GroupProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.sky.lightest }}>
        <Tabs
          sceneContainerStyle={{
            backgroundColor: theme.sky.lightest,
          }}
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: theme.sky.lightest,
              borderTopWidth: 2,
              borderTopColor: theme.sky.lighter,
              height: 96,
            },
          }}>
          <Tabs.Screen
            name="reports"
            options={{
              title: t('Reports'),
              tabBarButton: (props) => {
                return <TabButton {...props} />;
              },
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name={t('Reports')} focused={focused}>
                  <FileAttachmentIcon width="24px" height="24px" />
                </TabIcon>
              ),
            }}
          />
          <Tabs.Screen
            name="groups"
            options={{
              title: t('Groups'),
              tabBarButton: (props) => {
                return <TabButton {...props} />;
              },
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name={t('Groups')} focused={focused}>
                  <GroupIcon width="24px" height="24px" />
                </TabIcon>
              ),
            }}
          />

          <Tabs.Screen
            name="create"
            options={{
              headerShown: false,
              tabBarButton: (props) => {
                return <TopTabButton {...props} />;
              },
              tabBarIcon: ({ focused }) => (
                <TopTabIcon focused={focused}>
                  <PlusIcon width="24px" height="24px" />
                </TopTabIcon>
              ),
            }}
          />

          <Tabs.Screen
            name="alignments"
            options={{
              title: t('Alignments'),
              tabBarButton: (props) => {
                return <TabButton {...props} />;
              },
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name={t('Alignments')} focused={focused}>
                  <CreditCardIcon width="24px" height="24px" />
                </TabIcon>
              ),
            }}
          />
          <Tabs.Screen
            name="you"
            options={{
              title: t('You'),
              tabBarButton: (props) => {
                return <TabButton {...props} />;
              },
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name={t('You')} focused={focused}>
                  <UserIcon width="24px" height="24px" />
                </TabIcon>
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
      <StatusBar />
    </GroupProvider>
  );
};

export default TabLayout;
