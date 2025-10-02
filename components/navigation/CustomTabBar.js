import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  TYPOGRAPHY,
  ICON_SIZES,
} from '../../constants';

// Tab configuration
const TAB_CONFIG = {
  home: {
    icon: 'home-outline',
    activeIcon: 'home',
    label: 'Home',
  },
  transactions: {
    icon: 'receipt-outline',
    activeIcon: 'receipt',
    label: 'Transactions',
  },
  budgets: {
    icon: 'pie-chart-outline',
    activeIcon: 'pie-chart',
    label: 'Budgets',
  },
  reports: {
    icon: 'bar-chart-outline',
    activeIcon: 'bar-chart',
    label: 'Reports',
  },
  settings: {
    icon: 'settings-outline',
    activeIcon: 'settings',
    label: 'Settings',
  },
};

// Get tab bar icon based on route name
export const getTabBarIcon = (routeName, focused, color, size = ICON_SIZES.base) => {
  const config = TAB_CONFIG[routeName];
  if (!config) return null;

  const iconName = focused ? config.activeIcon : config.icon;

  return (
    <Ionicons
      name={iconName}
      size={size}
      color={color}
      style={styles.tabIcon}
    />
  );
};

// Get tab bar label with custom styling
export const getTabBarLabel = (label, focused, color) => {
  return (
    <Text
      style={[
        styles.tabLabel,
        {
          color,
          fontWeight: focused ? '600' : '500',
        },
      ]}
    >
      {label}
    </Text>
  );
};

// Custom tab bar component for more advanced customization
export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {/* Custom icon rendering */}
            {getTabBarIcon(route.name, isFocused, isFocused ? '#475569' : '#94a3b8')}

            {/* Custom label rendering */}
            {getTabBarLabel(label, isFocused, isFocused ? '#475569' : '#94a3b8')}

            {/* Active indicator */}
            {isFocused && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)', // Sophisticated light gray border
    height: 72, // Taller for better proportions
    paddingBottom: 12, // Increased for better spacing
    paddingTop: 12, // Increased for better spacing
    shadowColor: 'rgba(0, 0, 0, 0.08)', // Subtle shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6, // Slightly larger shadow
    elevation: 8,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8, // Better touch targets
    paddingHorizontal: 4, // Better spacing
  },

  tabIcon: {
    marginBottom: 4, // Increased spacing
  },

  tabLabel: {
    ...TYPOGRAPHY.ui.caption,
    fontSize: 12, // Slightly larger for better readability
    textAlign: 'center',
    fontWeight: '500', // Medium weight for better hierarchy
  },

  activeIndicator: {
    position: 'absolute',
    top: 4, // Moved up slightly
    left: '50%',
    marginLeft: -18, // Wider indicator
    width: 36, // Wider for better proportion
    height: 3,
    backgroundColor: '#475569', // Sophisticated blue-gray
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});
