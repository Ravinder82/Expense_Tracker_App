// Color Palette for Expense Tracker - Elegant Black & Gray Minimalist Theme
export const COLORS = {
  // Primary Colors - Sophisticated Blacks and Grays
  primary: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373', // Main primary - elegant medium gray
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717', // Deep charcoal black
  },

  // Secondary Colors (Expense/Income theme) - Elegant Grays
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Main secondary - sophisticated blue-gray
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Warning/Alert Colors - Sophisticated Amber Grays
  warning: {
    50: '#fefcf7',
    100: '#fef7ed',
    200: '#fef3c7',
    300: '#fde68a',
    400: '#facc15',
    500: '#eab308', // Main warning - warm amber gray
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Error/Danger Colors - Sophisticated Red Grays
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#dc2626', // Main error - deep red gray
    600: '#b91c1c',
    700: '#991b1b',
    800: '#7f1d1d',
    900: '#6b1d1d',
  },

  // Neutral Colors (Grays)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373', // Main neutral
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Background Colors - Sophisticated Gray Scale
  background: {
    primary: '#ffffff', // Pure white for main backgrounds
    secondary: '#f8fafc', // Very light gray-blue for secondary areas
    tertiary: '#f1f5f9', // Light gray for tertiary elements
    overlay: 'rgba(0, 0, 0, 0.4)', // Darker overlay for better contrast
    modal: 'rgba(0, 0, 0, 0.6)', // Consistent modal background
  },

  // Text Colors - Elegant Gray Hierarchy
  text: {
    primary: '#1e293b', // Dark slate for primary text
    secondary: '#64748b', // Medium slate for secondary text
    tertiary: '#94a3b8', // Light slate for tertiary text
    inverse: '#ffffff', // Pure white for inverse text
    disabled: '#cbd5e1', // Very light gray for disabled text
  },

  // Border Colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
    focus: '#3b82f6',
  },

  // Category Colors (for expense categories) - Sophisticated Gray Scale
  categories: {
    food: '#dc2626',      // Deep red-gray
    transport: '#475569',  // Sophisticated blue-gray
    shopping: '#525252',   // Medium gray
    entertainment: '#eab308', // Warm amber-gray
    bills: '#334155',     // Darker slate gray
    health: '#059669',    // Sophisticated green-gray
    education: '#6366f1',  // Elegant indigo-gray
    other: '#6b7280',     // Standard gray
  },

  // Status Colors - Elegant Gray Scale
  status: {
    active: '#059669',      // Sophisticated green-gray
    inactive: '#94a3b8',    // Light gray for inactive
    pending: '#eab308',     // Warm amber-gray for pending
    completed: '#475569',   // Medium slate gray for completed
    cancelled: '#dc2626',   // Deep red-gray for cancelled
  },

  // Chart Colors - Sophisticated Gray Palette
  charts: {
    income: '#059669',      // Sophisticated green-gray
    expense: '#dc2626',     // Deep red-gray
    savings: '#475569',     // Medium slate gray
    budget: '#eab308',      // Warm amber-gray
    series: [
      '#475569', // Sophisticated blue-gray
      '#dc2626', // Deep red-gray
      '#059669', // Sophisticated green-gray
      '#eab308', // Warm amber-gray
      '#525252', // Medium gray
      '#64748b', // Light slate gray
      '#334155', // Darker slate gray
      '#6b7280', // Standard gray
    ],
  },
};

// Semantic Color Mapping - Elegant Gray Theme
export const SEMANTIC_COLORS = {
  // Brand - Sophisticated Gray
  brand: COLORS.primary[500],      // #737373 - elegant medium gray
  brandLight: COLORS.primary[400],  // #a3a3a3 - lighter gray
  brandDark: COLORS.primary[600],   // #525252 - darker gray

  // Status - Refined Grays
  success: COLORS.status.active,    // #059669 - sophisticated green-gray
  warning: COLORS.warning[500],     // #eab308 - warm amber-gray
  error: COLORS.error[500],         // #dc2626 - deep red-gray
  info: COLORS.secondary[500],      // #64748b - blue-gray for info

  // UI States - Clean Grays
  active: COLORS.primary[500],      // #737373 - active state
  hover: COLORS.primary[400],       // #a3a3a3 - hover state
  disabled: COLORS.neutral[400],    // #a3a3a3 - disabled state

  // Text - Elegant Hierarchy
  textPrimary: COLORS.text.primary,    // #1e293b - dark slate
  textSecondary: COLORS.text.secondary, // #64748b - medium slate
  textTertiary: COLORS.text.tertiary,   // #94a3b8 - light slate

  // Backgrounds - Pure and Sophisticated
  bgPrimary: COLORS.background.primary,     // #ffffff - pure white
  bgSecondary: COLORS.background.secondary, // #f8fafc - very light gray-blue
  bgTertiary: COLORS.background.tertiary,   // #f1f5f9 - light gray

  // Borders - Subtle Gray Accents
  borderLight: COLORS.border.light,     // #e2e8f0 - very light gray
  borderMedium: COLORS.border.medium,   // #cbd5e1 - light gray
  borderFocus: COLORS.primary[500],     // #737373 - medium gray for focus
};

// Export individual colors for easy access
export const {
  primary,
  secondary,
  warning,
  error,
  neutral,
  background,
  text,
  border,
  categories,
  status,
  charts,
} = COLORS;
