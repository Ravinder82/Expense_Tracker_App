import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';

// Import design system
import {
  COLORS,
  SEMANTIC_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  getShadow,
} from '../../constants';

const LoadingSpinner = ({
  visible = true,
  size = 'large', // 'small', 'large'
  color = SEMANTIC_COLORS.brand,
  text,
  overlay = false, // Full screen overlay
  style,
  ...props
}) => {
  // If not visible, don't render anything
  if (!visible) {
    return null;
  }

  // Get spinner size
  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
      default:
        return 'large';
    }
  };

  // Render inline spinner
  const renderInlineSpinner = () => (
    <View style={[styles.inlineContainer, style]}>
      <ActivityIndicator
        size={getSpinnerSize()}
        color={color}
        {...props}
      />
      {text && (
        <Text style={styles.inlineText}>
          {text}
        </Text>
      )}
    </View>
  );

  // Render overlay spinner
  const renderOverlaySpinner = () => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      {...props}
    >
      <View style={styles.overlayContainer}>
        <View style={[styles.overlayContent, style]}>
          <ActivityIndicator
            size={getSpinnerSize()}
            color={color}
          />
          {text && (
            <Text style={styles.overlayText}>
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );

  return overlay ? renderOverlaySpinner() : renderInlineSpinner();
};

// Preset loading states for common use cases
LoadingSpinner.Page = ({ text = 'Loading...', ...props }) => (
  <LoadingSpinner
    overlay={true}
    size="large"
    text={text}
    {...props}
  />
);

LoadingSpinner.Button = ({ color = COLORS.neutral[50], ...props }) => (
  <LoadingSpinner
    size="small"
    color={color}
    {...props}
  />
);

LoadingSpinner.Inline = ({ text, ...props }) => (
  <LoadingSpinner
    overlay={false}
    size="small"
    text={text}
    {...props}
  />
);

const styles = StyleSheet.create({
  // Inline spinner styles
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING[2],
  },

  inlineText: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.text.secondary,
    marginLeft: SPACING[2],
  },

  // Overlay spinner styles
  overlayContainer: {
    flex: 1,
    backgroundColor: COLORS.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayContent: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING[6],
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 120,
    ...getShadow('lg'),
  },

  overlayText: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.primary,
    marginTop: SPACING[3],
    textAlign: 'center',
  },
});

export default LoadingSpinner;
