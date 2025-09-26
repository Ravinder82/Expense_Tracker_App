import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

// Import design system
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  getShadow,
} from '../../constants';

const CustomCard = ({
  children,
  onPress,
  variant = 'default', // 'default', 'elevated', 'outlined', 'filled'
  size = 'medium', // 'small', 'medium', 'large'
  style,
  contentStyle,
  disabled = false,
  ...props
}) => {
  // Get card container style
  const getCardStyle = () => {
    const baseStyle = [styles.card];

    // Variant styles
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.cardElevated);
        break;
      case 'outlined':
        baseStyle.push(styles.cardOutlined);
        break;
      case 'filled':
        baseStyle.push(styles.cardFilled);
        break;
      default:
        baseStyle.push(styles.cardDefault);
    }

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.cardSmall);
        break;
      case 'large':
        baseStyle.push(styles.cardLarge);
        break;
      default:
        // medium is default
        break;
    }

    // Disabled state
    if (disabled) {
      baseStyle.push(styles.cardDisabled);
    }

    // Custom style
    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  // Get content style
  const getContentStyle = () => {
    const baseStyle = [styles.content];

    if (contentStyle) {
      baseStyle.push(contentStyle);
    }

    return baseStyle;
  };

  // Render card content
  const renderContent = () => (
    <View style={getContentStyle()}>
      {children}
    </View>
  );

  // If pressable, wrap in TouchableOpacity
  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // Non-pressable card
  return (
    <View style={getCardStyle()} {...props}>
      {renderContent()}
    </View>
  );
};

// Card sub-components for structured content
CustomCard.Header = ({ children, style, ...props }) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);

CustomCard.Body = ({ children, style, ...props }) => (
  <View style={[styles.body, style]} {...props}>
    {children}
  </View>
);

CustomCard.Footer = ({ children, style, ...props }) => (
  <View style={[styles.footer, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.base,
    overflow: 'hidden',
  },

  cardDefault: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...getShadow('xs'),
  },

  cardElevated: {
    ...getShadow('md'),
  },

  cardOutlined: {
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    backgroundColor: 'transparent',
  },

  cardFilled: {
    backgroundColor: COLORS.neutral[50],
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  cardSmall: {
    padding: SPACING[3],
  },

  cardLarge: {
    padding: SPACING[6],
  },

  cardDisabled: {
    opacity: 0.6,
  },

  content: {
    padding: SPACING[4],
  },

  // Sub-component styles
  header: {
    paddingBottom: SPACING[3],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  body: {
    flex: 1,
    paddingVertical: SPACING[3],
  },

  footer: {
    paddingTop: SPACING[3],
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
});

export default CustomCard;
