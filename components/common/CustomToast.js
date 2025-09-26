import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  SEMANTIC_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  ICON_SIZES,
  getShadow,
} from '../../constants';

const CustomToast = ({
  visible = false,
  message,
  type = 'info', // 'success', 'error', 'warning', 'info'
  duration = 3000, // Auto-hide duration in ms
  onHide,
  position = 'top', // 'top', 'bottom'
  icon,
  action, // { text: string, onPress: function }
  style,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;

  // Get toast configuration based on type
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: SEMANTIC_COLORS.success,
          icon: icon || 'checkmark-circle',
          iconColor: COLORS.neutral[50],
        };
      case 'error':
        return {
          backgroundColor: SEMANTIC_COLORS.error,
          icon: icon || 'close-circle',
          iconColor: COLORS.neutral[50],
        };
      case 'warning':
        return {
          backgroundColor: SEMANTIC_COLORS.warning,
          icon: icon || 'alert-circle',
          iconColor: COLORS.neutral[900],
        };
      case 'info':
      default:
        return {
          backgroundColor: SEMANTIC_COLORS.info,
          icon: icon || 'information-circle',
          iconColor: COLORS.neutral[50],
        };
    }
  };

  // Show/hide animations
  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: position === 'top' ? -100 : 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const hideToast = () => {
    if (onHide) {
      onHide();
    }
  };

  const handleActionPress = () => {
    if (action && action.onPress) {
      action.onPress();
    }
    hideToast();
  };

  // Don't render if not visible and animation hasn't started
  if (!visible && fadeAnim._value === 0) {
    return null;
  }

  const config = getToastConfig();
  const containerStyle = position === 'top' ? styles.topContainer : styles.bottomContainer;

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
        style,
      ]}
      {...props}
    >
      <View style={[styles.toast, { backgroundColor: config.backgroundColor }]}>
        {/* Icon */}
        <Ionicons
          name={config.icon}
          size={ICON_SIZES.lg}
          color={config.iconColor}
          style={styles.icon}
        />

        {/* Message */}
        <Text style={[styles.message, { color: config.iconColor }]}>
          {message}
        </Text>

        {/* Action Button */}
        {action && (
          <TouchableOpacity
            onPress={handleActionPress}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel={action.text}
          >
            <Text style={[styles.actionText, { color: config.iconColor }]}>
              {action.text}
            </Text>
          </TouchableOpacity>
        )}

        {/* Close Button */}
        <TouchableOpacity
          onPress={hideToast}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Close notification"
        >
          <Ionicons
            name="close"
            size={ICON_SIZES.base}
            color={config.iconColor}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Toast Manager for managing multiple toasts
class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
  }

  show(toastConfig) {
    const id = Date.now().toString();
    const toast = { id, ...toastConfig };
    this.toasts.push(toast);
    this.notifyListeners();

    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        this.hide(id);
      }, toast.duration || 3000);
    }

    return id;
  }

  hide(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.toasts));
  }

  // Convenience methods
  success(message, options = {}) {
    return this.show({ message, type: 'success', ...options });
  }

  error(message, options = {}) {
    return this.show({ message, type: 'error', ...options });
  }

  warning(message, options = {}) {
    return this.show({ message, type: 'warning', ...options });
  }

  info(message, options = {}) {
    return this.show({ message, type: 'info', ...options });
  }
}

// Export singleton instance
export const toastManager = new ToastManager();

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACING[4],
    right: SPACING[4],
    zIndex: 1000,
  },

  topContainer: {
    top: SPACING[12], // Account for status bar
  },

  bottomContainer: {
    bottom: SPACING[20], // Account for tab bar
  },

  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING[4],
    borderRadius: BORDER_RADIUS.base,
    ...getShadow('lg'),
    minHeight: 56,
  },

  icon: {
    marginRight: SPACING[3],
  },

  message: {
    ...TYPOGRAPHY.body.base,
    flex: 1,
    fontWeight: '500',
  },

  actionButton: {
    marginLeft: SPACING[3],
    paddingHorizontal: SPACING[2],
    paddingVertical: SPACING[1],
  },

  actionText: {
    ...TYPOGRAPHY.ui.button.small,
    fontWeight: '600',
  },

  closeButton: {
    marginLeft: SPACING[2],
    padding: SPACING[1],
  },
});

export default CustomToast;
