import { Tabs } from 'expo-router';
import { colors } from '../../../src/constants/theme';

export default function AdminTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Commandes',
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Planning',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
        }}
      />
    </Tabs>
  );
}
