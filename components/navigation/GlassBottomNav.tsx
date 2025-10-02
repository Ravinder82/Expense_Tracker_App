import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassContainer } from '../glassmorphic/GlassContainer';
import { GlassIcon } from '../glassmorphic/GlassIcon';
import { NavigationVariant } from '../../types/glassmorphic';
import { NAV_ITEMS, ACTIVE_INDICATORS } from '../../constants/navigationVariants';
import { GlassAnimations } from '../../utils/animations';

// React Navigation route type definition
interface Route {
  key: string;
  name: string;
  params?: Record<string, any>;
}

const { width } = Dimensions.get('window');

interface GlassBottomNavProps {
  state: any;
  descriptors: any;
  navigation: any;
  variant: NavigationVariant;
}

export const GlassBottomNav: React.FC<GlassBottomNavProps> = ({
  state,
  descriptors,
  navigation,
  variant,
}) => {
  const insets = useSafeAreaInsets();
  const [pressedItem, setPressedItem] = useState<string | null>(null);

  const { routes } = state;

  // Animation values for each nav item
  const itemAnimations = useRef(
    routes.reduce((acc: Record<string, { scale: Animated.Value; translateY: Animated.Value; opacity: Animated.Value }>, item: Route) => {
      acc[item.key] = {
        scale: new Animated.Value(1),
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
      };
      return acc;
    }, {} as Record<string, { scale: Animated.Value; translateY: Animated.Value; opacity: Animated.Value }>)
  ).current;

  // Entrance animation
  useEffect(() => {
    const animations = routes.map((item: Route, index: number) =>
      GlassAnimations.createTimingAnimation(
        itemAnimations[item.key].translateY,
        0,
        {
          duration: 300,
          delay: index * 50,
          easing: 'ease-out'
        }
      )
    );

    // Start with items below and animate up
    routes.forEach((item: Route) => {
      itemAnimations[item.key].translateY.setValue(50);
    });

    GlassAnimations.createStaggeredAnimation(animations, 50).start();
  }, []);

  const animateItemPress = (itemId: string, pressed: boolean) => {
    const anim = itemAnimations[itemId];
    const targetScale = pressed ? 0.9 : 1;
    const targetOpacity = pressed ? 0.7 : 1;

    Animated.parallel([
      GlassAnimations.createSpringAnimation(anim.scale, targetScale, {
        duration: 150,
        easing: 'spring',
        springConfig: { tension: 400, friction: 15 }
      }),
      GlassAnimations.createTimingAnimation(anim.opacity, targetOpacity, {
        duration: 150,
        easing: 'ease-out'
      })
    ]).start();
  };

  const isFloatingIslands = variant.id === 'floating_islands';

  const renderNavItem = (route: any, index: number): React.ReactNode => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    // Determine the label
    const label = options.tabBarLabel
      ? (typeof options.tabBarLabel === 'function' ? options.tabBarLabel({ focused: isFocused }) : options.tabBarLabel)
      : options.title || route.name;

    const isPressed = pressedItem === route.key;

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
    
    const itemStyle = [
      styles.navItem,
      isFocused && getActiveIndicatorStyle(variant.activeIndicator),
      isPressed && styles.pressedItem,
    ];

    const iconColor = isFocused
      ? 'rgba(71, 85, 105, 0.9)' // Sophisticated blue-gray for active state
      : 'rgba(100, 116, 139, 0.7)'; // Medium slate for inactive state

    const itemAnim = itemAnimations[route.key];

    return (
      <Animated.View
        key={route.key}
        style={{
          transform: [
            { scale: itemAnim.scale },
            { translateY: itemAnim.translateY },
          ],
          opacity: itemAnim.opacity,
        }}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={itemStyle}
          onPressIn={() => {
            setPressedItem(route.key);
            animateItemPress(route.key, true);
          }}
          onPressOut={() => {
            setPressedItem(null);
            animateItemPress(route.key, false);
          }}
          activeOpacity={1}
        >
          {options.tabBarIcon({ focused: isFocused, color: iconColor, size: 24 })}
          <Text style={[styles.label, { color: iconColor }]}> {label} </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const getActiveIndicatorStyle = (indicator: string) => {
    const indicatorStyle = ACTIVE_INDICATORS[indicator as keyof typeof ACTIVE_INDICATORS];
    return indicatorStyle || {};
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {!isFloatingIslands ? (
        <GlassContainer
          variant={variant.glassConfig}
          style={styles.navContainer}
        >
          <View style={styles.navContent}>
            {state.routes.map((route: Route, index: number) => renderNavItem(route, index))}
          </View>
        </GlassContainer>
      ) : (
        <View style={styles.floatingContainer}>
          {state.routes.map((route: Route, index: number) => renderNavItem(route, index))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20, // Increased for better spacing
    paddingTop: 12, // Increased for better visual separation
  },
  navContainer: {
    borderRadius: 28, // Slightly more rounded for elegance
    paddingVertical: 1, // Increased for better touch targets
    paddingHorizontal: 12, // Increased for better spacing
    backgroundColor: 'rgba(248, 250, 252, 0.3)', // More transparent for glass effect
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)', // More visible border
    overflow: 'hidden', // Ensure blur doesn't overflow
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly', // More even spacing
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10, // Increased for better touch targets
    paddingHorizontal: 6, // Increased for better spacing
    borderRadius: 20, // More rounded for elegance
    minHeight: 10, // Taller for better proportions
    marginHorizontal: 2, // Small margin between items
  },
  centerItem: {
    transform: [{ scale: 1.1 }],
    marginTop: -8,
  },
  floatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  floatingItem: {
    flex: 0,
    minWidth: 60,
    marginHorizontal: 4,
  },
  floatingPod: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 64,
  },
  pressedItem: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  label: {
    fontSize: 11, // Slightly larger for better readability
    fontWeight: '500',
    marginTop: 6, // Increased spacing between icon and label
    textAlign: 'center',
    color: '#64748b', // Sophisticated medium slate color
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
