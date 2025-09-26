// Layout & Spacing Constants for Expense Tracker

// Spacing Scale (following 8px grid system)
export const SPACING = {
  // Micro spacing
  px: 1,   // 1px
  0.5: 2,  // 2px

  // Small spacing
  1: 4,    // 4px
  1.5: 6,  // 6px
  2: 8,    // 8px
  2.5: 10, // 10px
  3: 12,   // 12px
  3.5: 14, // 14px
  4: 16,   // 16px

  // Medium spacing
  5: 20,   // 20px
  6: 24,   // 24px
  7: 28,   // 28px
  8: 32,   // 32px
  9: 36,   // 36px
  10: 40,  // 40px

  // Large spacing
  12: 48,  // 48px
  14: 56,  // 56px
  16: 64,  // 64px
  18: 72,  // 72px
  20: 80,  // 80px
  24: 96,  // 96px
  28: 112, // 112px
  32: 128, // 128px
  36: 144, // 144px
  40: 160, // 160px

  // Extra large spacing
  48: 192, // 192px
  56: 224, // 224px
  64: 256, // 256px
  72: 288, // 288px
  80: 320, // 320px
  96: 384, // 384px
};

// Border Radius Scale
export const BORDER_RADIUS = {
  none: 0,
  xs: 2,   // Extra small - subtle corners
  sm: 4,   // Small - buttons, inputs
  base: 6, // Base - cards, modals
  md: 8,   // Medium - larger cards
  lg: 12,  // Large - prominent elements
  xl: 16,  // Extra large - special elements
  '2xl': 24, // 2X large - hero elements
  '3xl': 32, // 3X large - very large elements
  full: 9999, // Fully rounded - avatars, badges
};

// Shadow/Elevation System
export const SHADOWS = {
  // iOS Shadows
  ios: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    xs: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    base: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
    },
    '2xl': {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.15,
      shadowRadius: 30,
    },
  },

  // Android Elevation (maps to iOS shadows)
  android: {
    none: { elevation: 0 },
    xs: { elevation: 1 },
    sm: { elevation: 2 },
    base: { elevation: 3 },
    md: { elevation: 4 },
    lg: { elevation: 6 },
    xl: { elevation: 8 },
    '2xl': { elevation: 12 },
  },
};

// Cross-platform shadow function
export const getShadow = (size = 'base') => {
  return {
    ...SHADOWS.ios[size],
    ...SHADOWS.android[size],
  };
};

// Layout Constants
export const LAYOUT = {
  // Screen margins
  screen: {
    horizontal: SPACING[4], // 16px
    vertical: SPACING[4],   // 16px
  },

  // Container widths
  container: {
    maxWidth: 375, // Mobile-first max width
    padding: SPACING[4],
  },

  // Component spacing
  component: {
    gap: {
      xs: SPACING[2],  // 8px
      sm: SPACING[3],  // 12px
      md: SPACING[4],  // 16px
      lg: SPACING[6],  // 24px
      xl: SPACING[8],  // 32px
    },
  },

  // Card layouts
  card: {
    padding: SPACING[4],      // 16px
    borderRadius: BORDER_RADIUS.base, // 6px
    shadow: getShadow('sm'),
  },

  // Button layouts
  button: {
    height: {
      sm: 36,  // Small buttons
      md: 44,  // Medium buttons (default)
      lg: 52,  // Large buttons
    },
    padding: {
      horizontal: SPACING[4], // 16px
      vertical: SPACING[2],   // 8px
    },
    borderRadius: BORDER_RADIUS.sm, // 4px
  },

  // Input layouts
  input: {
    height: 44,              // Standard input height
    padding: {
      horizontal: SPACING[3], // 12px
      vertical: SPACING[2],   // 8px
    },
    borderRadius: BORDER_RADIUS.sm, // 4px
    borderWidth: 1,
  },

  // Modal layouts
  modal: {
    borderRadius: BORDER_RADIUS.lg, // 12px
    padding: SPACING[6],            // 24px
    maxWidth: 340,
  },

  // Navigation layouts
  navigation: {
    height: 64,             // Bottom tab bar height
    headerHeight: 56,       // Header height
    tabBarHeight: 64,       // Tab bar height
  },
};

// Animation Constants
export const ANIMATIONS = {
  duration: {
    fast: 150,   // Quick interactions
    normal: 250, // Standard transitions
    slow: 350,   // Slower transitions
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear',
  },
};

// Z-Index Layers
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  overlay: 1070,
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  xs: 0,     // Extra small devices
  sm: 640,   // Small devices (phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
  '2xl': 1536, // 2X large devices
};

// Helper functions
export const getResponsiveValue = (values) => {
  // This would be used with a responsive hook in a real implementation
  // For now, return the base value
  return values.base || values;
};

export const getSpacing = (key) => SPACING[key] || SPACING[4];
export const getBorderRadius = (key) => BORDER_RADIUS[key] || BORDER_RADIUS.base;
