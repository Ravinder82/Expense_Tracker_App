import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  SEMANTIC_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  LAYOUT,
  ICON_SIZES,
} from '../../constants';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // 'left', 'right'
  style,
  textStyle,
  ...props
}) => {
  // Get button styles based on variant and size
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyle.push(styles.buttonLarge);
        break;
      default:
        // medium is default
        break;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonGhost);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }

    // Custom style
    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  // Get text styles based on variant and size
  const getTextStyle = () => {
    const baseTextStyle = [styles.buttonText];

    // Size-based text styles
    switch (size) {
      case 'small':
        baseTextStyle.push(styles.buttonTextSmall);
        break;
      case 'large':
        baseTextStyle.push(styles.buttonTextLarge);
        break;
      default:
        // medium is default
        break;
    }

    // Variant-based text colors
    switch (variant) {
      case 'secondary':
        baseTextStyle.push(styles.buttonTextSecondary);
        break;
      case 'ghost':
        baseTextStyle.push(styles.buttonTextGhost);
        break;
      case 'outline':
        baseTextStyle.push(styles.buttonTextOutline);
        break;
      default:
        baseTextStyle.push(styles.buttonTextPrimary);
    }

    // Disabled state
    if (disabled || loading) {
      baseTextStyle.push(styles.buttonTextDisabled);
    }

    // Custom text style
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  // Get icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return ICON_SIZES.sm;
      case 'large':
        return ICON_SIZES.lg;
      default:
        return ICON_SIZES.base;
    }
  };

  // Get icon color based on variant
  const getIconColor = () => {
    if (disabled || loading) {
      return COLORS.neutral[400];
    }

    switch (variant) {
      case 'secondary':
        return SEMANTIC_COLORS.brand;
      case 'ghost':
        return COLORS.neutral[600];
      case 'outline':
        return SEMANTIC_COLORS.brand;
      default:
        return COLORS.neutral[50]; // White for primary
    }
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const iconSize = getIconSize();
  const iconColor = getIconColor();

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={loading ? 'Loading...' : title}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getIconColor()}
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={styles.iconLeft}
            />
          )}

          <Text style={getTextStyle()}>
            {title}
          </Text>

          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.sm,
    height: LAYOUT.button.height.md,
    paddingHorizontal: LAYOUT.button.padding.horizontal,
    paddingVertical: LAYOUT.button.padding.vertical,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 80, // Minimum touch target
  },

  buttonPrimary: {
    backgroundColor: SEMANTIC_COLORS.brand,
  },

  buttonSecondary: {
    backgroundColor: COLORS.neutral[100],
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },

  buttonGhost: {
    backgroundColor: 'transparent',
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: SEMANTIC_COLORS.brand,
  },

  buttonDisabled: {
    backgroundColor: COLORS.neutral[200],
    opacity: 0.6,
  },

  buttonSmall: {
    height: LAYOUT.button.height.sm,
    paddingHorizontal: SPACING[3],
  },

  buttonLarge: {
    height: LAYOUT.button.height.lg,
    paddingHorizontal: SPACING[5],
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: TYPOGRAPHY.ui.button.base.fontSize,
    fontWeight: TYPOGRAPHY.ui.button.base.fontWeight,
    textAlign: 'center',
  },

  buttonTextPrimary: {
    color: COLORS.neutral[50], // White text for primary
  },

  buttonTextSecondary: {
    color: SEMANTIC_COLORS.brand,
  },

  buttonTextGhost: {
    color: COLORS.neutral[600],
  },

  buttonTextOutline: {
    color: SEMANTIC_COLORS.brand,
  },

  buttonTextDisabled: {
    color: COLORS.neutral[400],
  },

  buttonTextSmall: {
    fontSize: TYPOGRAPHY.ui.button.small.fontSize,
  },

  buttonTextLarge: {
    fontSize: TYPOGRAPHY.ui.button.large.fontSize,
  },

  iconLeft: {
    marginRight: SPACING[2],
  },

  iconRight: {
    marginLeft: SPACING[2],
  },

  loadingIndicator: {
    // ActivityIndicator is already centered
  },
});

export default CustomButton;
