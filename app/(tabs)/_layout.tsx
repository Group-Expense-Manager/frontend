import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import { TabButton, TabIcon, TopTabButton, TopTabIcon } from '@/components';
import theme from '@/constants/Colors';
import { CreditCardIcon, FileAttachmentIcon, GroupIcon, PlusIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupProvider } from '@/context/group/GroupContext';

const TabLayout = () => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { userData } = useContext(GlobalContext);
  return (
    <GroupProvider>
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
            tabBarButton: (props) => {
              return <TabButton {...props} />;
            },
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
            tabBarButton: (props) => {
              return <TabButton {...props} />;
            },
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
            tabBarButton: (props) => {
              return <TopTabButton {...props} />;
            },
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
            tabBarButton: (props) => {
              return <TabButton {...props} />;
            },
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
            tabBarButton: (props) => {
              return <TabButton {...props} />;
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={t('You')} focused={focused}>
                <Image
                  source={userData.profilePicture.uri === '' ? undefined : userData.profilePicture}
                />
              </TabIcon>
            ),
          }}
        />
      </Tabs>
    </GroupProvider>
  );
};

export default TabLayout;
