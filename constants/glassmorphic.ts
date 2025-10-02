import { DesignToken, GlassEffect, GlassmorphicVariant } from '../types/glassmorphic';
import { Platform } from 'react-native';

// Core Glassmorphic Design Tokens
export const GLASSMORPHIC_TOKENS: DesignToken = {
  glass: {
    blur: {
      light: 8,
      medium: 15,
      heavy: 25,
    },
    opacity: {
      subtle: 0.1,
      medium: 0.2,
      strong: 0.3,
    },
    colors: {
      primary: 'rgba(255, 255, 255, 0.15)',      // Pure white glass
      secondary: 'rgba(245, 245, 245, 0.08)',   // Light gray glass
      accent: 'rgba(115, 115, 115, 0.12)',       // Sophisticated gray accent
      neutral: 'rgba(23, 23, 23, 0.05)',         // Deep charcoal neutral
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadows: {
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.15)',
    heavy: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
};

// Base Glass Effects
export const GLASS_EFFECTS = {
  // Ultra-light frosted glass
  ETHEREAL: {
    blur: GLASSMORPHIC_TOKENS.glass.blur.light,
    opacity: GLASSMORPHIC_TOKENS.glass.opacity.subtle,
    backgroundColor: GLASSMORPHIC_TOKENS.glass.colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  } as GlassEffect,

  // Medium frosted glass
  CRYSTALLINE: {
    blur: GLASSMORPHIC_TOKENS.glass.blur.medium,
    opacity: GLASSMORPHIC_TOKENS.glass.opacity.medium,
    backgroundColor: GLASSMORPHIC_TOKENS.glass.colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  } as GlassEffect,

  // Heavy frosted glass
  PRISMATIC: {
    blur: GLASSMORPHIC_TOKENS.glass.blur.heavy,
    opacity: GLASSMORPHIC_TOKENS.glass.opacity.strong,
    backgroundColor: GLASSMORPHIC_TOKENS.glass.colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1.5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  } as GlassEffect,

  // Accent glass with sophisticated gray
  AURORA: {
    blur: GLASSMORPHIC_TOKENS.glass.blur.medium,
    opacity: GLASSMORPHIC_TOKENS.glass.opacity.medium,
    backgroundColor: GLASSMORPHIC_TOKENS.glass.colors.accent,
    borderColor: 'rgba(115, 115, 115, 0.3)',
    borderWidth: 1,
    shadowColor: 'rgba(82, 82, 82, 0.2)',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  } as GlassEffect,

  // Dark glass
  OBSIDIAN: {
    blur: GLASSMORPHIC_TOKENS.glass.blur.medium,
    opacity: GLASSMORPHIC_TOKENS.glass.opacity.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  } as GlassEffect,
};

// Multi-layer Glass Variants
export const GLASS_VARIANTS: Record<string, GlassmorphicVariant> = {
  // Single layer - minimal
  MINIMAL: {
    name: 'Minimal Glass',
    description: 'Single ethereal layer for subtle depth',
    layers: [
      {
        id: 'base',
        effect: GLASS_EFFECTS.ETHEREAL,
        zIndex: 1,
      },
    ],
  },

  // Double layer - balanced
  BALANCED: {
    name: 'Balanced Glass',
    description: 'Two-layer system for optimal depth and clarity',
    layers: [
      {
        id: 'background',
        effect: {
          ...GLASS_EFFECTS.ETHEREAL,
          opacity: 0.05,
          blur: 20,
        },
        zIndex: 1,
      },
      {
        id: 'foreground',
        effect: GLASS_EFFECTS.CRYSTALLINE,
        zIndex: 2,
      },
    ],
  },

  // Triple layer - premium
  PREMIUM: {
    name: 'Premium Glass',
    description: 'Three-layer system for maximum depth and sophistication',
    layers: [
      {
        id: 'backdrop',
        effect: {
          ...GLASS_EFFECTS.ETHEREAL,
          opacity: 0.03,
          blur: 30,
        },
        zIndex: 1,
      },
      {
        id: 'middle',
        effect: {
          ...GLASS_EFFECTS.CRYSTALLINE,
          opacity: 0.08,
        },
        zIndex: 2,
      },
      {
        id: 'surface',
        effect: GLASS_EFFECTS.PRISMATIC,
        zIndex: 3,
      },
    ],
  },

  // Accent variant
  ACCENT: {
    name: 'Accent Glass',
    description: 'Colored glass with aurora effects',
    layers: [
      {
        id: 'base',
        effect: GLASS_EFFECTS.ETHEREAL,
        zIndex: 1,
      },
      {
        id: 'accent',
        effect: GLASS_EFFECTS.AURORA,
        zIndex: 2,
      },
    ],
  },

  // Dark theme variant
  DARK: {
    name: 'Dark Glass',
    description: 'Dark-themed glass for night mode',
    layers: [
      {
        id: 'base',
        effect: GLASS_EFFECTS.OBSIDIAN,
        zIndex: 1,
      },
    ],
  },
};

// Animation Presets
export const ANIMATION_PRESETS = {
  GENTLE_SPRING: {
    duration: 300,
    easing: 'spring' as const,
    springConfig: {
      tension: 300,
      friction: 20,
    },
  },
  SMOOTH_EASE: {
    duration: 250,
    easing: 'ease-out' as const,
  },
  QUICK_BOUNCE: {
    duration: 200,
    easing: 'spring' as const,
    springConfig: {
      tension: 400,
      friction: 15,
    },
  },
};

// Color Gradients for Glass Backgrounds
export const GLASS_GRADIENTS = {
  DAWN: 'linear-gradient(135deg, rgba(255, 154, 158, 0.1) 0%, rgba(250, 208, 196, 0.1) 100%)',
  OCEAN: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  FOREST: 'linear-gradient(135deg, rgba(134, 239, 172, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
  SUNSET: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(220, 38, 127, 0.1) 100%)',
  MIDNIGHT: 'linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, rgba(15, 23, 42, 0.1) 100%)',
};

export const CrystallineDesign = {
  // Clarity Over Blur: Lower blur radius for a crisper, crystalline feel.
  blur: Platform.OS === 'ios' ? 10 : 25, // iOS supports blur well, Android needs more for a similar effect.

  // Purposeful Transparency: Opacity that enhances readability and hierarchy.
  opacity: {
    light: 0.6,
    medium: 0.45,
    dark: 0.3,
  },

  // Defined Edges: Sharp, semi-transparent borders and subtle glows.
  border: {
    width: 1,
    colorLight: 'rgba(255, 255, 255, 0.3)',
    colorDark: 'rgba(0, 0, 0, 0.1)',
  },

  // Structured Layers & Colors: A clean, sophisticated grayscale palette.
  palette: {
    // Primary background/tint for glass panels
    tint: 'rgba(248, 250, 252, 0.8)', // Very light gray-blue tint
    tintDark: 'rgba(23, 23, 23, 0.8)', // Deep charcoal for dark mode

    // Accent colors for active states, icons, etc. - Sophisticated grays
    accent: '#475569', // Sophisticated blue-gray for active states
    accentSecondary: '#dc2626', // Deep red-gray for destructive actions

    // Text colors ensuring perfect readability on glass backgrounds.
    textPrimary: '#1e293b', // Dark slate for primary text
    textSecondary: 'rgba(100, 116, 139, 0.7)', // Medium slate with opacity
    textPrimaryDark: '#f8fafc', // Very light gray for dark mode primary
    textSecondaryDark: 'rgba(148, 163, 184, 0.7)', // Light slate for dark mode secondary
  },

  // Minimalist Shadows: Subtle, diffused shadows for depth.
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5, // for Android
  },

  // Geometric Precision: Consistent border radius for panels.
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
