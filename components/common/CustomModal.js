import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components
import CustomButton from './CustomButton';

// Import design system
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  getShadow,
} from '../../constants';

const CustomModal = ({
  visible = false,
  onClose,
  title,
  children,
  size = 'medium', // 'small', 'medium', 'large', 'fullscreen'
  showCloseButton = true,
  closeOnBackdropPress = true,
  style,
  contentStyle,
  ...props
}) => {
  // Get modal container style
  const getModalStyle = () => {
    const baseStyle = [styles.modalContainer];

    switch (size) {
      case 'small':
        baseStyle.push(styles.modalSmall);
        break;
      case 'large':
        baseStyle.push(styles.modalLarge);
        break;
      case 'fullscreen':
        baseStyle.push(styles.modalFullscreen);
        break;
      default:
        // medium is default
        break;
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  // Get content style
  const getContentStyle = () => {
    const baseStyle = [styles.modalContent];

    if (contentStyle) {
      baseStyle.push(contentStyle);
    }

    return baseStyle;
  };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />

        {/* Modal Content */}
        <View style={getModalStyle()}>
          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && (
                <Text style={styles.title}>
                  {title}
                </Text>
              )}

              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Close modal"
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.neutral[500]}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <ScrollView
            style={getContentStyle()}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Dialog component - specialized modal for confirmations and alerts
const CustomDialog = ({
  visible = false,
  onClose,
  title,
  message,
  type = 'info', // 'info', 'warning', 'error', 'success'
  actions = [], // Array of action objects: { text, onPress, variant, style }
  ...props
}) => {
  // Get dialog icon based on type
  const getDialogIcon = () => {
    switch (type) {
      case 'warning':
        return 'alert-triangle';
      case 'error':
        return 'close-circle';
      case 'success':
        return 'checkmark-circle';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  // Get dialog icon color
  const getDialogIconColor = () => {
    switch (type) {
      case 'warning':
        return COLORS.warning[500];
      case 'error':
        return COLORS.error[500];
      case 'success':
        return COLORS.secondary[500];
      case 'info':
      default:
        return COLORS.primary[500];
    }
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      size="small"
      showCloseButton={false}
      closeOnBackdropPress={false}
      {...props}
    >
      <View style={styles.dialogContent}>
        {/* Icon */}
        <View style={styles.dialogIcon}>
          <Ionicons
            name={getDialogIcon()}
            size={48}
            color={getDialogIconColor()}
          />
        </View>

        {/* Title */}
        {title && (
          <Text style={styles.dialogTitle}>
            {title}
          </Text>
        )}

        {/* Message */}
        {message && (
          <Text style={styles.dialogMessage}>
            {message}
          </Text>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <View style={styles.dialogActions}>
            {actions.map((action, index) => (
              <CustomButton
                key={index}
                title={action.text}
                onPress={() => {
                  if (action.onPress) {
                    action.onPress();
                  }
                  if (onClose) {
                    onClose();
                  }
                }}
                variant={action.variant || (index === 0 ? 'secondary' : 'primary')}
                style={[
                  index > 0 && styles.actionSpacing,
                  action.style,
                ]}
                size="small"
              />
            ))}
          </View>
        )}
      </View>
    </CustomModal>
  );
};

// Convenience dialog functions
export const showAlert = (toastManager, config) => {
  return toastManager.show({
    message: config.message,
    type: config.type || 'info',
    action: config.action,
    duration: config.duration || 4000,
  });
};

export const showConfirmDialog = (setDialogVisible, config) => {
  setDialogVisible(true);
  // This would be used with state management
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  modalContainer: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.lg,
    margin: SPACING[4],
    maxHeight: '80%',
    width: '90%',
    ...getShadow('xl'),
  },

  modalSmall: {
    width: '80%',
    maxWidth: 320,
  },

  modalLarge: {
    width: '95%',
    maxWidth: 500,
  },

  modalFullscreen: {
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  title: {
    ...TYPOGRAPHY.heading.h4,
    color: COLORS.text.primary,
    flex: 1,
  },

  closeButton: {
    padding: SPACING[1],
    marginLeft: SPACING[2],
  },

  modalContent: {
    padding: SPACING[4],
  },

  // Dialog specific styles
  dialogContent: {
    alignItems: 'center',
    paddingVertical: SPACING[6],
  },

  dialogIcon: {
    marginBottom: SPACING[4],
  },

  dialogTitle: {
    ...TYPOGRAPHY.heading.h3,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING[3],
  },

  dialogMessage: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: SPACING[6],
    marginBottom: SPACING[6],
  },

  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  actionSpacing: {
    marginLeft: SPACING[3],
  },
});

export { CustomDialog };
export default CustomModal;
