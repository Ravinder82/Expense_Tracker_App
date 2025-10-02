import React, { useEffect, useRef } from 'react';
import { View, ViewStyle, StyleSheet, Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassEffect, GlassmorphicVariant } from '../../types/glassmorphic';
import { GlassAnimations } from '../../utils/animations';

interface GlassContainerProps {
  variant?: GlassmorphicVariant;
  glassEffect?: GlassEffect;
  style?: ViewStyle;
  children?: React.ReactNode;
  animated?: boolean;
  floating?: boolean;
  shimmer?: boolean;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  variant,
  glassEffect,
  style,
  children,
  animated = true,
  floating = false,
  shimmer = false,
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      // Entrance animation
      GlassAnimations.createSpringAnimation(scaleAnim, 1, {
        duration: 300,
        easing: 'spring',
        springConfig: { tension: 300, friction: 20 }
      }).start();
    }

    if (floating) {
      GlassAnimations.createFloatingAnimation(floatAnim, 2, 3000).start();
    }

    if (shimmer) {
      GlassAnimations.createShimmerAnimation(shimmerAnim, 2000).start();
    }
  }, [animated, floating, shimmer]);

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { translateY: floatAnim },
    ],
  };
  // Use variant layers or single glass effect
  const layers = variant?.layers || (glassEffect ? [{ 
    id: 'single', 
    effect: glassEffect, 
    zIndex: 1 
  }] : []);

  const renderLayer = (layer: any, index: number) => {
    const hasBlur = layer.effect.blur && layer.effect.blur > 0;
    
    const layerStyle: ViewStyle = {
      position: index === 0 ? 'relative' : 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: style?.borderRadius || 16,
      borderWidth: layer.effect.borderWidth || 0,
      borderColor: layer.effect.borderColor || 'transparent',
      zIndex: layer.zIndex,
      overflow: 'hidden',
      ...(layer.effect.shadowColor && {
        shadowColor: layer.effect.shadowColor,
        shadowOpacity: layer.effect.shadowOpacity || 0.1,
        shadowRadius: layer.effect.shadowRadius || 4,
        shadowOffset: layer.effect.shadowOffset || { width: 0, height: 2 },
        elevation: layer.effect.shadowRadius || 4, // Android shadow
      }),
    };

    const overlayStyle: ViewStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: layer.effect.backgroundColor,
      opacity: layer.effect.opacity || 1,
    };

    return (
      <View
        key={layer.id}
        style={[
          layerStyle,
          index === 0 && style, // Apply external style only to base layer
        ]}
      >
        {hasBlur ? (
          <>
            <BlurView
              intensity={Platform.OS === 'ios' ? layer.effect.blur * 5 : layer.effect.blur * 2}
              tint="default"
              style={StyleSheet.absoluteFill}
            />
            <View style={overlayStyle} />
          </>
        ) : (
          <View style={[StyleSheet.absoluteFill, overlayStyle]} />
        )}
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {layers.map((layer, index) => renderLayer(layer, index))}
      {children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
      {shimmer && (
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.3, 0],
              }),
              transform: [
                {
                  translateX: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: 100, // Ensure content is above all glass layers
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    zIndex: 99,
  },
});
