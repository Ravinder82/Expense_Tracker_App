import { Tabs } from 'expo-router';
import { GlassBottomNav } from '../../components/navigation/GlassBottomNav';
import { BOTTOM_NAV_VARIANTS } from '../../constants/navigationVariants';
import { Ionicons } from '@expo/vector-icons';
import { CrystallineDesign } from '../../constants/glassmorphic';
import { COLORS } from '../../constants/colors';

const CrystallineNavBar = (props) => (
  <GlassBottomNav
    state={props.state}
    descriptors={props.descriptors}
    navigation={props.navigation}
    variant={BOTTOM_NAV_VARIANTS.find(v => v.id === 'crystalline_balanced')}
  />
);

export default function TabLayout() {
  return (
    <Tabs
      tabBar={CrystallineNavBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26} // Slightly larger icons
              color={focused ? COLORS.primary[500] : COLORS.secondary[500]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: 'Chart',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'pie-chart' : 'pie-chart-outline'}
              size={26} // Slightly larger icons
              color={focused ? COLORS.primary[500] : COLORS.secondary[500]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarLabel: () => null, // Hide label for the center button
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'add-circle'}
              size={44} // Larger for center button prominence
              color={COLORS.status.active} // Use sophisticated green-gray
              style={{ transform: [{ translateY: -6 }] }} // Slightly higher
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26} // Slightly larger icons
              color={focused ? COLORS.primary[500] : COLORS.secondary[500]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={26} // Slightly larger icons
              color={focused ? COLORS.primary[500] : COLORS.secondary[500]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
