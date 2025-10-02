// Glassmorphic Design System Types

export interface GlassEffect {
  blur: number;
  opacity: number;
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: {
    width: number;
    height: number;
  };
}

export interface GlassLayer {
  id: string;
  effect: GlassEffect;
  zIndex: number;
}

export interface GlassmorphicVariant {
  name: string;
  description: string;
  layers: GlassLayer[];
  animation?: AnimationConfig;
}

export interface AnimationConfig {
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
  delay?: number;
  springConfig?: {
    tension: number;
    friction: number;
  };
}

export interface DesignToken {
  glass: {
    blur: {
      light: number;
      medium: number;
      heavy: number;
    };
    opacity: {
      subtle: number;
      medium: number;
      strong: number;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      neutral: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    light: string;
    medium: string;
    heavy: string;
  };
}

export interface NavigationVariant {
  id: string;
  name: string;
  glassConfig: GlassmorphicVariant;
  iconStyle: 'filled' | 'outlined' | 'glass';
  activeIndicator: 'glow' | 'blur' | 'scale' | 'slide';
}

export interface ComponentProps {
  variant?: string;
  glassEffect?: Partial<GlassEffect>;
  animated?: boolean;
  children?: React.ReactNode;
}

export interface IconProps extends ComponentProps {
  name: string;
  size?: number;
  color?: string;
  glassLayers?: number;
}

export interface NavigationItemProps extends ComponentProps {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}
