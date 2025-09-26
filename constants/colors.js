// Color Palette for Expense Tracker
export const COLORS = {
  // Primary Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary Colors (Expense/Income theme)
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main secondary (success/green)
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning/Alert Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error/Danger Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
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

  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    overlay: 'rgba(0, 0, 0, 0.5)',
    modal: 'rgba(0, 0, 0, 0.6)',
  },

  // Text Colors
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
    disabled: '#cbd5e1',
  },

  // Border Colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
    focus: '#3b82f6',
  },

  // Category Colors (for expense categories)
  categories: {
    food: '#ef4444',      // Red
    transport: '#3b82f6',  // Blue
    shopping: '#8b5cf6',   // Purple
    entertainment: '#f59e0b', // Orange
    bills: '#06b6d4',     // Cyan
    health: '#10b981',    // Green
    education: '#6366f1',  // Indigo
    other: '#6b7280',     // Gray
  },

  // Status Colors
  status: {
    active: '#22c55e',
    inactive: '#94a3b8',
    pending: '#f59e0b',
    completed: '#3b82f6',
    cancelled: '#ef4444',
  },

  // Chart Colors
  charts: {
    income: '#22c55e',
    expense: '#ef4444',
    savings: '#3b82f6',
    budget: '#f59e0b',
    series: [
      '#3b82f6', // Blue
      '#ef4444', // Red
      '#22c55e', // Green
      '#f59e0b', // Orange
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#f97316', // Orange-red
      '#84cc16', // Lime
    ],
  },
};

// Semantic Color Mapping
export const SEMANTIC_COLORS = {
  // Brand
  brand: COLORS.primary[500],
  brandLight: COLORS.primary[400],
  brandDark: COLORS.primary[600],

  // Status
  success: COLORS.secondary[500],
  warning: COLORS.warning[500],
  error: COLORS.error[500],
  info: COLORS.primary[500],

  // UI States
  active: COLORS.primary[500],
  hover: COLORS.primary[400],
  disabled: COLORS.neutral[400],

  // Text
  textPrimary: COLORS.text.primary,
  textSecondary: COLORS.text.secondary,
  textTertiary: COLORS.text.tertiary,

  // Backgrounds
  bgPrimary: COLORS.background.primary,
  bgSecondary: COLORS.background.secondary,
  bgTertiary: COLORS.background.tertiary,

  // Borders
  borderLight: COLORS.border.light,
  borderMedium: COLORS.border.medium,
  borderFocus: COLORS.border.focus,
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
