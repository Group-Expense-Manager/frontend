import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabIcon } from '@/components';
import theme from '@/constants/Colors';
import { CreditCardIcon, FileAttachmentIcon, GroupIcon, UserIcon } from '@/constants/Icon';

const TabLayout = () => {
  const { t } = useTranslation();

  return (
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
            <TabIcon name="Reports" focused={focused}>
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
            <TabIcon name="Groups" focused={focused}>
              <GroupIcon width="24px" height="24px" />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="alignments"
        options={{
          title: t('Alignments'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Alignments" focused={focused}>
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
            <TabIcon name="You" focused={focused}>
              <UserIcon width="24px" height="24px" />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
