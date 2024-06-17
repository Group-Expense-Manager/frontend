import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabIcon, TopTabButton, TopTabIcon } from '@/components';
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

  return (
    <GroupProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.sky.lightest,
            borderTopWidth: 0,
            borderTopColor: theme.sky.lightest,
            height: 92,
          },
        }}>
        <Tabs.Screen
          name="reports"
          options={{
            title: t('Reports'),
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
            tabBarIcon: ({ focused }) => (
              <TopTabIcon focused={focused}>
                <PlusIcon width="24px" height="24px" />
              </TopTabIcon>
            ),
            tabBarButton: (props) => {
              return <TopTabButton {...props} />;
            },
          }}
        />

        <Tabs.Screen
          name="alignments"
          options={{
            title: t('Alignments'),
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
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={t('You')} focused={focused}>
                <UserIcon width="24px" height="24px" />
              </TabIcon>
            ),
          }}
        />
      </Tabs>
    </GroupProvider>
  );
};

export default TabLayout;
