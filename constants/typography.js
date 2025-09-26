import { Platform } from 'react-native';

// Typography System for Expense Tracker
export const FONT_FAMILIES = {
  // Primary font family (System fonts for better performance)
  primary: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'System',
    }),
    semibold: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'System',
    }),
  },

  // Monospace for code/numbers
  monospace: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
};

export const FONT_WEIGHTS = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

// Font Sizes (following a modular scale)
export const FONT_SIZES = {
  xs: 12,    // Extra small - captions, metadata
  sm: 14,    // Small - secondary text
  base: 16,  // Base - body text
  lg: 18,    // Large - emphasized body text
  xl: 20,    // Extra large - headings
  '2xl': 24, // 2X large - subheadings
  '3xl': 30, // 3X large - main headings
  '4xl': 36, // 4X large - hero text
  '5xl': 48, // 5X large - large hero text
  '6xl': 60, // 6X large - massive headings
};

// Line Heights (following typography best practices)
export const LINE_HEIGHTS = {
  tight: 1.25,    // Tight spacing for headings
  normal: 1.5,    // Normal spacing for body text
  relaxed: 1.625, // Relaxed spacing for better readability
  loose: 2,       // Loose spacing for emphasis
};

// Letter Spacing
export const LETTER_SPACING = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
};

// Typography Presets (combining size, weight, line height)
export const TYPOGRAPHY = {
  // Display Text
  display: {
    large: {
      fontSize: FONT_SIZES['6xl'],
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tighter,
    },
    medium: {
      fontSize: FONT_SIZES['5xl'],
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tighter,
    },
    small: {
      fontSize: FONT_SIZES['4xl'],
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tighter,
    },
  },

  // Headings
  heading: {
    h1: {
      fontSize: FONT_SIZES['3xl'],
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tight,
    },
    h2: {
      fontSize: FONT_SIZES['2xl'],
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tight,
    },
    h3: {
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tight,
    },
    h4: {
      fontSize: FONT_SIZES.lg,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
    },
    h5: {
      fontSize: FONT_SIZES.base,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
    },
    h6: {
      fontSize: FONT_SIZES.sm,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // Body Text
  body: {
    large: {
      fontSize: FONT_SIZES.lg,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.relaxed,
      letterSpacing: LETTER_SPACING.normal,
    },
    base: {
      fontSize: FONT_SIZES.base,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.relaxed,
      letterSpacing: LETTER_SPACING.normal,
    },
    small: {
      fontSize: FONT_SIZES.sm,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // UI Text
  ui: {
    button: {
      large: {
        fontSize: FONT_SIZES.base,
        fontWeight: FONT_WEIGHTS.semibold,
        lineHeight: LINE_HEIGHTS.tight,
        letterSpacing: LETTER_SPACING.normal,
      },
      base: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
        lineHeight: LINE_HEIGHTS.tight,
        letterSpacing: LETTER_SPACING.normal,
      },
      small: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
        lineHeight: LINE_HEIGHTS.tight,
        letterSpacing: LETTER_SPACING.normal,
      },
    },
    label: {
      fontSize: FONT_SIZES.sm,
      fontWeight: FONT_WEIGHTS.medium,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
    },
    caption: {
      fontSize: FONT_SIZES.xs,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.wide,
    },
    overline: {
      fontSize: FONT_SIZES.xs,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.widest,
      textTransform: 'uppercase',
    },
  },

  // Special Text
  special: {
    code: {
      fontSize: FONT_SIZES.sm,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
      fontFamily: FONT_FAMILIES.monospace,
    },
    emphasis: {
      fontSize: FONT_SIZES.base,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: FONT_SIZES.base * 1.5,
      letterSpacing: LETTER_SPACING.normal,
    },
    quote: {
      fontSize: FONT_SIZES.lg,
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: LINE_HEIGHTS.relaxed,
      letterSpacing: LETTER_SPACING.tight,
      fontStyle: 'italic',
    },
  },
};

// Helper function to create text styles
export const createTextStyle = (preset, customOverrides = {}) => {
  const baseStyle = TYPOGRAPHY[preset.category]?.[preset.variant] || TYPOGRAPHY.body.base;

  return {
    fontSize: baseStyle.fontSize,
    fontWeight: baseStyle.fontWeight,
    lineHeight: baseStyle.lineHeight,
    letterSpacing: baseStyle.letterSpacing,
    fontFamily: baseStyle.fontFamily || FONT_FAMILIES.primary.regular,
    ...customOverrides,
  };
};

// Export for easy access
export const {
  display,
  heading,
  body,
  ui,
  special,
} = TYPOGRAPHY;
