import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconProps } from '../../types/glassmorphic';
import { GLASS_ICON_STYLES } from '../../constants/navigationVariants';
import { GlassContainer } from './GlassContainer';
import { GLASS_EFFECTS } from '../../constants/glassmorphic';

export const GlassIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'rgba(255, 255, 255, 0.8)',
  glassLayers = 1,
  variant = 'outlined',
  glassEffect,
  style,
  animated = true,
}) => {
  const iconStyle = GLASS_ICON_STYLES[variant as keyof typeof GLASS_ICON_STYLES] || GLASS_ICON_STYLES.outlined;
  
  const renderIcon = () => (
    <Ionicons
      name={name as any}
      size={size}
      color={color}
      style={[
        iconStyle,
        {
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }
      ]}
    />
  );

  // For glass variant, wrap in glass container
  if (variant === 'glass') {
    return (
      <GlassContainer
        glassEffect={glassEffect || GLASS_EFFECTS.ETHEREAL}
        style={[
          styles.glassIconContainer,
          { width: size + 16, height: size + 16 },
          style,
        ]}
        animated={animated}
      >
        {renderIcon()}
      </GlassContainer>
    );
  }

  // For multi-layer glass effects
  if (glassLayers > 1) {
    return (
      <View style={[styles.layeredContainer, style]}>
        {Array.from({ length: glassLayers }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.iconLayer,
              {
                opacity: 0.3 - (index * 0.1),
                transform: [
                  { translateX: index * 1 },
                  { translateY: index * 1 },
                ],
              },
            ]}
          >
            {renderIcon()}
          </View>
        ))}
        <View style={styles.topLayer}>
          {renderIcon()}
        </View>
      </View>
    );
  }

  // Standard icon
  return (
    <View style={[styles.iconContainer, style]}>
      {renderIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  layeredContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLayer: {
    position: 'absolute',
  },
  topLayer: {
    position: 'relative',
    zIndex: 10,
  },
});
