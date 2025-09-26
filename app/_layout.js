import { Stack } from 'expo-router';
import { COLORS, TYPOGRAPHY } from '../constants';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background.primary,
        },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: {
          ...TYPOGRAPHY.heading.h4,
          fontWeight: '600',
        },
        headerShadowVisible: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'Expense Tracker',
          headerShown: false, // Hide header for splash/redirect screen
        }}
      />
    </Stack>
  );
}
