import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabIcon } from '@/components';
import { CreditCardIcon, FileAttachmentIcon, GroupIcon, UserIcon } from '@/constants/Icon';
// import { GroupsProvider } from '@/context/GroupsContext';

const TabLayout = () => {
  // return (
  //   <Stack>
  //     <Stack.Screen
  //       name="homef"
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //   </Stack>
  // );
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}>
      <Tabs.Screen
        name="reports"
        options={{
          title: t('Reports'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Reports">
              <FileAttachmentIcon />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: t('Groups'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Groups">
              <GroupIcon />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="alignments"
        options={{
          title: t('Alignments'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Alignments">
              <CreditCardIcon />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: t('You'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="You">
              <UserIcon />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
