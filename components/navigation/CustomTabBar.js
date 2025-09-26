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
            {getTabBarIcon(route.name, isFocused, COLORS.primary[500])}

            {/* Custom label rendering */}
            {getTabBarLabel(label, isFocused, COLORS.primary[500])}

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
    borderTopColor: COLORS.border.light,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: COLORS.neutral[900],
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  tabIcon: {
    marginBottom: 2,
  },

  tabLabel: {
    ...TYPOGRAPHY.ui.caption,
    fontSize: 11,
    textAlign: 'center',
  },

  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 3,
    backgroundColor: COLORS.primary[500],
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});
