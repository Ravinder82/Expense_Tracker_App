import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
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

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  disabled = false,
  style,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedBorderWidth = useRef(new Animated.Value(1)).current;
  const inputRef = useRef(null);

  // Handle focus/blur animations
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedBorderWidth, {
      toValue: 2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedBorderWidth, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Get container style
  const getContainerStyle = () => {
    const baseStyle = [styles.container];

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  // Get input container style
  const getInputContainerStyle = () => {
    const baseStyle = [styles.inputContainer];

    if (error) {
      baseStyle.push(styles.inputContainerError);
    } else if (isFocused) {
      baseStyle.push(styles.inputContainerFocused);
    }

    if (disabled) {
      baseStyle.push(styles.inputContainerDisabled);
    }

    return baseStyle;
  };

  // Get input style
  const getInputStyle = () => {
    const baseStyle = [styles.input];

    if (multiline) {
      baseStyle.push(styles.inputMultiline);
    }

    if (leftIcon) {
      baseStyle.push(styles.inputWithLeftIcon);
    }

    if (rightIcon || secureTextEntry) {
      baseStyle.push(styles.inputWithRightIcon);
    }

    if (disabled) {
      baseStyle.push(styles.inputDisabled);
    }

    if (inputStyle) {
      baseStyle.push(inputStyle);
    }

    return baseStyle;
  };

  // Get label style
  const getLabelStyle = () => {
    const baseStyle = [styles.label];

    if (isFocused || (value && value.length > 0)) {
      baseStyle.push(styles.labelFocused);
    }

    if (error) {
      baseStyle.push(styles.labelError);
    }

    if (disabled) {
      baseStyle.push(styles.labelDisabled);
    }

    if (labelStyle) {
      baseStyle.push(labelStyle);
    }

    return baseStyle;
  };

  // Determine right icon
  const getRightIcon = () => {
    if (secureTextEntry) {
      return showPassword ? 'eye-off-outline' : 'eye-outline';
    }
    return rightIcon;
  };

  // Handle right icon press
  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setShowPassword(!showPassword);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  // Get secure text entry state
  const getSecureTextEntry = () => {
    if (!secureTextEntry) return false;
    return !showPassword;
  };

  return (
    <View style={getContainerStyle()}>
      {/* Label */}
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <Animated.View
        style={[
          getInputContainerStyle(),
          {
            borderWidth: animatedBorderWidth,
          },
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={ICON_SIZES.base}
            color={disabled ? COLORS.neutral[400] : COLORS.neutral[500]}
            style={styles.leftIcon}
          />
        )}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={getInputStyle()}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral[400]}
          secureTextEntry={getSecureTextEntry()}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable && !disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
          accessibilityHint={helperText}
          {...props}
        />

        {/* Right Icon */}
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress && !secureTextEntry}
            accessibilityRole="button"
            accessibilityLabel={
              secureTextEntry
                ? (showPassword ? 'Hide password' : 'Show password')
                : 'Right icon'
            }
          >
            <Ionicons
              name={getRightIcon()}
              size={ICON_SIZES.base}
              color={disabled ? COLORS.neutral[400] : COLORS.neutral[500]}
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <Text style={[
          styles.helperText,
          error ? styles.errorText : styles.helperTextNormal
        ]}>
          {error || helperText}
        </Text>
      )}

      {/* Character Count */}
      {maxLength && (
        <Text style={styles.charCount}>
          {value ? value.length : 0}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING[4],
  },

  label: {
    ...TYPOGRAPHY.ui.label,
    color: COLORS.text.secondary,
    marginBottom: SPACING[2],
  },

  labelFocused: {
    color: SEMANTIC_COLORS.brand,
    fontWeight: '600',
  },

  labelError: {
    color: SEMANTIC_COLORS.error,
  },

  labelDisabled: {
    color: COLORS.text.disabled,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background.primary,
    minHeight: LAYOUT.input.height,
  },

  inputContainerFocused: {
    borderColor: SEMANTIC_COLORS.brand,
  },

  inputContainerError: {
    borderColor: SEMANTIC_COLORS.error,
  },

  inputContainerDisabled: {
    backgroundColor: COLORS.neutral[50],
    borderColor: COLORS.border.light,
  },

  leftIcon: {
    marginLeft: SPACING[3],
    marginRight: SPACING[2],
  },

  input: {
    flex: 1,
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.primary,
    paddingHorizontal: LAYOUT.input.padding.horizontal,
    paddingVertical: LAYOUT.input.padding.vertical,
    minHeight: LAYOUT.input.height,
  },

  inputWithLeftIcon: {
    paddingLeft: 0,
  },

  inputWithRightIcon: {
    paddingRight: 0,
  },

  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: LAYOUT.input.height * 3,
  },

  inputDisabled: {
    color: COLORS.text.disabled,
  },

  rightIconContainer: {
    padding: SPACING[3],
    marginRight: SPACING[1],
  },

  helperText: {
    ...TYPOGRAPHY.ui.caption,
    marginTop: SPACING[1],
  },

  helperTextNormal: {
    color: COLORS.text.tertiary,
  },

  errorText: {
    color: SEMANTIC_COLORS.error,
  },

  charCount: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.tertiary,
    textAlign: 'right',
    marginTop: SPACING[1],
  },
});

export default CustomInput;
