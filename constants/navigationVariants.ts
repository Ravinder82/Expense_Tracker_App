import { NavigationVariant } from '../types/glassmorphic';
import { GLASS_VARIANTS, ANIMATION_PRESETS } from './glassmorphic';

export const BOTTOM_NAV_VARIANTS: NavigationVariant[] = [
  // Variant 1: Ethereal Minimal
  {
    id: 'ethereal_minimal',
    name: 'Ethereal Minimal',
    glassConfig: {
      ...GLASS_VARIANTS.MINIMAL,
      name: 'Ethereal Navigation',
      description: 'Ultra-light frosted glass with subtle depth',
      animation: ANIMATION_PRESETS.GENTLE_SPRING,
    },
    iconStyle: 'outlined',
    activeIndicator: 'glow',
  },

  // Variant 2: Crystalline Balanced
  {
    id: 'crystalline_balanced',
    name: 'Crystalline Balanced',
    glassConfig: {
      ...GLASS_VARIANTS.BALANCED,
      name: 'Crystalline Navigation',
      description: 'Dual-layer glass with perfect balance of depth and clarity',
      animation: ANIMATION_PRESETS.SMOOTH_EASE,
    },
    iconStyle: 'filled',
    activeIndicator: 'blur',
  },

  // Variant 3: Premium Prismatic
  {
    id: 'premium_prismatic',
    name: 'Premium Prismatic',
    glassConfig: {
      ...GLASS_VARIANTS.PREMIUM,
      name: 'Prismatic Navigation',
      description: 'Triple-layer premium glass with maximum sophistication',
      animation: ANIMATION_PRESETS.GENTLE_SPRING,
    },
    iconStyle: 'glass',
    activeIndicator: 'scale',
  },

  // Variant 4: Aurora Accent
  {
    id: 'aurora_accent',
    name: 'Aurora Accent',
    glassConfig: {
      ...GLASS_VARIANTS.ACCENT,
      name: 'Aurora Navigation',
      description: 'Colored glass with dynamic aurora effects',
      animation: {
        ...ANIMATION_PRESETS.QUICK_BOUNCE,
        duration: 350,
      },
    },
    iconStyle: 'filled',
    activeIndicator: 'glow',
  },

  // Variant 5: Floating Islands
  {
    id: 'floating_islands',
    name: 'Floating Islands',
    glassConfig: {
      name: 'Floating Islands Navigation',
      description: 'Individual glass pods that float independently',
      layers: [
        {
          id: 'island_base',
          effect: {
            blur: 12,
            opacity: 0.15,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.12)',
            shadowOpacity: 0.12,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          },
          zIndex: 1,
        },
      ],
      animation: {
        duration: 400,
        easing: 'spring',
        springConfig: {
          tension: 250,
          friction: 25,
        },
      },
    },
    iconStyle: 'outlined',
    activeIndicator: 'slide',
  },
];

// Navigation Item Configurations
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    route: '/',
  },
  {
    id: 'transactions',
    icon: 'receipt',
    label: 'Transactions',
    route: '/transactions',
  },
  {
    id: 'add',
    icon: 'plus',
    label: 'Add',
    route: '/add',
    isCenter: true, // Special center button
  },
  {
    id: 'budgets',
    icon: 'target',
    label: 'Budgets',
    route: '/budgets',
  },
  {
    id: 'reports',
    icon: 'chart-bar',
    label: 'Reports',
    route: '/reports',
  },
];

// Active Indicator Styles - Sophisticated Gray Theme
export const ACTIVE_INDICATORS = {
  glow: {
    shadowColor: 'rgba(71, 85, 105, 0.6)', // Sophisticated blue-gray glow
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  blur: {
    backgroundColor: 'rgba(71, 85, 105, 0.2)', // Sophisticated blue-gray blur
    blur: 8,
  },
  scale: {
    transform: [{ scale: 1.1 }],
  },
  slide: {
    backgroundColor: 'rgba(71, 85, 105, 0.15)', // Sophisticated blue-gray slide
    borderRadius: 20,
    transform: [{ translateY: -2 }],
  },
};

// Glass Icon Configurations - Sophisticated Gray Theme
export const GLASS_ICON_STYLES = {
  outlined: {
    strokeWidth: 1.5,
    fill: 'none',
    stroke: 'rgba(30, 41, 59, 0.8)', // Dark slate for outlined icons
  },
  filled: {
    fill: 'rgba(71, 85, 105, 0.9)', // Sophisticated blue-gray for filled icons
    stroke: 'none',
  },
  glass: {
    fill: 'rgba(248, 250, 252, 0.1)', // Very light gray for glass effect
    stroke: 'rgba(100, 116, 139, 0.6)', // Medium slate stroke
    strokeWidth: 1,
    backdropFilter: 'blur(4px)',
  },
};
