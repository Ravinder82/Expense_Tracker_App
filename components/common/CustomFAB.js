import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  SEMANTIC_COLORS,
  SPACING,
  BORDER_RADIUS,
  getShadow,
  ICON_SIZES,
} from '../../constants';

const CustomFAB = ({
  onPress,
  icon = 'add',
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'primary', // 'primary', 'secondary', 'extended'
  position = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  visible = true,
  disabled = false,
  loading = false,
  label, // For extended variant
  style,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Animate FAB in/out based on visibility
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: visible ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, scaleAnim, opacityAnim]);

  // Get size configuration
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          width: SPACING[12],
          height: SPACING[12],
          iconSize: ICON_SIZES.sm,
        };
      case 'large':
        return {
          width: SPACING[16],
          height: SPACING[16],
          iconSize: ICON_SIZES.lg,
        };
      default: // medium
        return {
          width: SPACING[14],
          height: SPACING[14],
          iconSize: ICON_SIZES.base,
        };
    }
  };

  // Get variant styles
  const getVariantStyle = () => {
    const baseStyle = [styles.fab];

    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.fabSecondary);
        break;
      case 'extended':
        baseStyle.push(styles.fabExtended);
        break;
      default:
        baseStyle.push(styles.fabPrimary);
    }

    if (disabled || loading) {
      baseStyle.push(styles.fabDisabled);
    }

    return baseStyle;
  };

  // Get position styles
  const getPositionStyle = () => {
    const positions = {
      'bottom-right': styles.positionBottomRight,
      'bottom-left': styles.positionBottomLeft,
      'top-right': styles.positionTopRight,
      'top-left': styles.positionTopLeft,
    };

    return positions[position] || styles.positionBottomRight;
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      // Add haptic feedback here if needed
      onPress();
    }
  };

  const sizeConfig = getSizeConfig();
  const isExtended = variant === 'extended';

  return (
    <Animated.View
      style={[
        getPositionStyle(),
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={[
          getVariantStyle(),
          {
            width: isExtended ? 'auto' : sizeConfig.width,
            height: sizeConfig.height,
            minWidth: isExtended ? 120 : sizeConfig.width,
          },
        ]}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={label || `${icon} button`}
        accessibilityState={{ disabled: disabled || loading }}
        {...props}
      >
        <View style={styles.fabContent}>
          {/* Loading spinner */}
          {loading ? (
            <Animated.View
              style={[
                styles.loadingSpinner,
                { width: sizeConfig.iconSize, height: sizeConfig.iconSize },
              ]}
            />
          ) : (
            /* Icon */
            <Ionicons
              name={icon}
              size={sizeConfig.iconSize}
              color={disabled || loading ? COLORS.neutral[400] : COLORS.neutral[50]}
            />
          )}

          {/* Label for extended variant */}
          {isExtended && label && (
            <View style={styles.labelContainer}>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    color: disabled || loading ? COLORS.neutral[400] : COLORS.neutral[50],
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Animated.Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// FAB Group for multiple related actions
export const FABGroup = ({
  mainFAB,
  actions = [],
  visible = true,
  style,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const animationValues = useRef(
    actions.map(() => new Animated.Value(0))
  ).current;

  const toggleGroup = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.stagger(100, [
      Animated.timing(animationValues[0], {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      ...animationValues.slice(1).map((anim, index) =>
        Animated.timing(anim, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        })
      ),
    ]).start();

    setIsOpen(!isOpen);
  };

  return (
    <View style={[styles.fabGroup, style]}>
      {/* Action FABs */}
      {actions.map((action, index) => (
        <Animated.View
          key={action.key || index}
          style={[
            styles.fabGroupItem,
            {
              opacity: animationValues[index],
              transform: [
                {
                  translateY: animationValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -(index + 1) * 60],
                  }),
                },
                {
                  scale: animationValues[index],
                },
              ],
            },
          ]}
        >
          <CustomFAB
            icon={action.icon}
            onPress={action.onPress}
            size="small"
            style={styles.groupActionFAB}
          />
        </Animated.View>
      ))}

      {/* Main FAB */}
      <CustomFAB
        {...mainFAB}
        onPress={actions.length > 0 ? toggleGroup : mainFAB.onPress}
        icon={isOpen ? 'close' : mainFAB.icon}
        style={styles.mainGroupFAB}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow('lg'),
  },

  fabPrimary: {
    backgroundColor: SEMANTIC_COLORS.brand,
  },

  fabSecondary: {
    backgroundColor: COLORS.neutral[600],
  },

  fabExtended: {
    backgroundColor: SEMANTIC_COLORS.brand,
    paddingHorizontal: SPACING[4],
  },

  fabDisabled: {
    backgroundColor: COLORS.neutral[400],
    ...getShadow('sm'),
  },

  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingSpinner: {
    borderWidth: 2,
    borderColor: COLORS.neutral[50],
    borderTopColor: 'transparent',
    borderRadius: BORDER_RADIUS.full,
  },

  labelContainer: {
    marginLeft: SPACING[2],
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Position styles
  positionBottomRight: {
    position: 'absolute',
    bottom: SPACING[6],
    right: SPACING[6],
  },

  positionBottomLeft: {
    position: 'absolute',
    bottom: SPACING[6],
    left: SPACING[6],
  },

  positionTopRight: {
    position: 'absolute',
    top: SPACING[6],
    right: SPACING[6],
  },

  positionTopLeft: {
    position: 'absolute',
    top: SPACING[6],
    left: SPACING[6],
  },

  // FAB Group styles
  fabGroup: {
    position: 'absolute',
    bottom: SPACING[6],
    right: SPACING[6],
  },

  fabGroupItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  groupActionFAB: {
    marginBottom: SPACING[2],
  },

  mainGroupFAB: {
    // No additional styles needed
  },
});

export default CustomFAB;
