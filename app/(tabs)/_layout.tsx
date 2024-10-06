import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import TabButton from '@/components/ui/button/TabButton';
import TabIcon from '@/components/ui/tab/TabIcon';
import theme from '@/constants/Colors';
import { GroupIcon, PlusCircleIcon } from '@/constants/Icon';
import { GlobalContext } from '@/context/GlobalContext';
import useProfilePicture from '@/hooks/attachment/UseProfilePicture';
import useUserDetails from '@/hooks/userdetails/UseUserDetails';

const TabLayout = () => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { authState } = useContext(GlobalContext);
  const { data: userDetails } = useUserDetails();
  const { data: profilePicture } = useProfilePicture(authState.userId, userDetails?.attachmentId);

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    return <TabButton {...props} />;
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
          title: t('Create'),
          tabBarButton,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <PlusCircleIcon />
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
