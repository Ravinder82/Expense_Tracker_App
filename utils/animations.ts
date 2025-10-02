import { Animated, Easing } from 'react-native';
import { AnimationConfig } from '../types/glassmorphic';

export class GlassAnimations {
  // Spring animation for glass elements
  static createSpringAnimation(
    animatedValue: Animated.Value,
    toValue: number,
    config?: AnimationConfig
  ): Animated.CompositeAnimation {
    return Animated.spring(animatedValue, {
      toValue,
      tension: config?.springConfig?.tension || 300,
      friction: config?.springConfig?.friction || 20,
      useNativeDriver: true,
    });
  }

  // Timing animation with easing
  static createTimingAnimation(
    animatedValue: Animated.Value,
    toValue: number,
    config?: AnimationConfig
  ): Animated.CompositeAnimation {
    const easingMap = {
      'linear': Easing.linear,
      'ease-in': Easing.in(Easing.ease),
      'ease-out': Easing.out(Easing.ease),
      'ease-in-out': Easing.inOut(Easing.ease),
    };

    return Animated.timing(animatedValue, {
      toValue,
      duration: config?.duration || 250,
      easing: easingMap[config?.easing || 'ease-out'],
      delay: config?.delay || 0,
      useNativeDriver: true,
    });
  }

  // Staggered animation for multiple elements
  static createStaggeredAnimation(
    animations: Animated.CompositeAnimation[],
    staggerDelay: number = 50
  ): Animated.CompositeAnimation {
    return Animated.stagger(staggerDelay, animations);
  }

  // Pulse animation for active states
  static createPulseAnimation(
    animatedValue: Animated.Value,
    minScale: number = 0.95,
    maxScale: number = 1.05,
    duration: number = 1000
  ): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: maxScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: minScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // Floating animation for glass elements
  static createFloatingAnimation(
    animatedValue: Animated.Value,
    amplitude: number = 3,
    duration: number = 2000
  ): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: amplitude,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -amplitude,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // Shimmer animation for glass surfaces
  static createShimmerAnimation(
    animatedValue: Animated.Value,
    duration: number = 1500
  ): Animated.CompositeAnimation {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  }

  // Ripple animation for touch feedback
  static createRippleAnimation(
    scaleValue: Animated.Value,
    opacityValue: Animated.Value,
    duration: number = 300
  ): Animated.CompositeAnimation {
    return Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  }

  // Glass morphing animation (opacity and blur changes)
  static createMorphAnimation(
    opacityValue: Animated.Value,
    scaleValue: Animated.Value,
    targetOpacity: number,
    targetScale: number = 1,
    config?: AnimationConfig
  ): Animated.CompositeAnimation {
    return Animated.parallel([
      this.createTimingAnimation(opacityValue, targetOpacity, config),
      this.createSpringAnimation(scaleValue, targetScale, config),
    ]);
  }
}

// Hook for managing glass animations
export const useGlassAnimations = () => {
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);
  const translateYValue = new Animated.Value(0);
  const rotateValue = new Animated.Value(0);

  const animatePress = (pressed: boolean) => {
    const targetScale = pressed ? 0.95 : 1;
    const targetOpacity = pressed ? 0.8 : 1;
    
    Animated.parallel([
      GlassAnimations.createSpringAnimation(scaleValue, targetScale, {
        duration: 150,
        easing: 'spring',
        springConfig: { tension: 400, friction: 15 }
      }),
      GlassAnimations.createTimingAnimation(opacityValue, targetOpacity, {
        duration: 150,
        easing: 'ease-out'
      })
    ]).start();
  };

  const animateFloat = (shouldFloat: boolean) => {
    if (shouldFloat) {
      GlassAnimations.createFloatingAnimation(translateYValue, 2, 3000).start();
    } else {
      GlassAnimations.createTimingAnimation(translateYValue, 0, {
        duration: 300,
        easing: 'ease-out'
      }).start();
    }
  };

  const animateActive = (active: boolean) => {
    const targetScale = active ? 1.05 : 1;
    GlassAnimations.createSpringAnimation(scaleValue, targetScale, {
      duration: 200,
      easing: 'spring',
      springConfig: { tension: 300, friction: 20 }
    }).start();
  };

  return {
    scaleValue,
    opacityValue,
    translateYValue,
    rotateValue,
    animatePress,
    animateFloat,
    animateActive,
  };
};
