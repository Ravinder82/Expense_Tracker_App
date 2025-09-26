import { Tabs } from 'expo-router';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { getTabBarIcon, getTabBarLabel } from '../../components/navigation/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary[500],
        tabBarInactiveTintColor: COLORS.neutral[400],
        tabBarStyle: {
          backgroundColor: COLORS.background.primary,
          borderTopColor: COLORS.border.light,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...TYPOGRAPHY.ui.caption,
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon('home', focused, color, size),
          tabBarLabel: ({ focused, color }) => getTabBarLabel('Home', focused, color),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon('transactions', focused, color, size),
          tabBarLabel: ({ focused, color }) => getTabBarLabel('Transactions', focused, color),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon('budgets', focused, color, size),
          tabBarLabel: ({ focused, color }) => getTabBarLabel('Budgets', focused, color),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon('reports', focused, color, size),
          tabBarLabel: ({ focused, color }) => getTabBarLabel('Reports', focused, color),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon('settings', focused, color, size),
          tabBarLabel: ({ focused, color }) => getTabBarLabel('Settings', focused, color),
        }}
      />
    </Tabs>
  );
}
