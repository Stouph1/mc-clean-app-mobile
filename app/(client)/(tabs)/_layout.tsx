import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../src/constants/theme';

export default function ClientTabsLayout() {
  const { t } = useTranslation();

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
        name="home"
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: t('my_bookings'),
          tabBarLabel: t('my_bookings'),
        }}
      />
      <Tabs.Screen
        name="loyalty"
        options={{
          title: t('my_loyalty_card'),
          tabBarLabel: t('my_loyalty_card'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarLabel: t('profile'),
        }}
      />
    </Tabs>
  );
}
