import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  ICON_SIZES,
  LAYOUT,
} from '../../constants';

const CustomHeader = ({
  title,
  subtitle,
  showBackButton = true,
  rightIcon,
  onRightPress,
  rightText,
  backgroundColor = COLORS.background.primary,
  textColor = COLORS.text.primary,
  style,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={textColor === COLORS.neutral[50] ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.container, { backgroundColor }, style]}>
        <View style={styles.content}>
          {/* Left side - Back button */}
          <View style={styles.leftContainer}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Ionicons
                  name="arrow-back"
                  size={ICON_SIZES.base}
                  color={textColor}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Center - Title and subtitle */}
          <View style={styles.centerContainer}>
            <Text
              style={[styles.title, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[styles.subtitle, { color: textColor }]}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            )}
          </View>

          {/* Right side - Custom action */}
          <View style={styles.rightContainer}>
            {rightIcon && (
              <TouchableOpacity
                onPress={onRightPress}
                style={styles.rightButton}
                accessibilityRole="button"
                accessibilityLabel="Header action"
              >
                <Ionicons
                  name={rightIcon}
                  size={ICON_SIZES.base}
                  color={textColor}
                />
              </TouchableOpacity>
            )}
            {rightText && (
              <TouchableOpacity
                onPress={onRightPress}
                style={styles.rightButton}
                accessibilityRole="button"
                accessibilityLabel={rightText}
              >
                <Text style={[styles.rightText, { color: textColor }]}>
                  {rightText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

// Header presets for common use cases
CustomHeader.Screen = ({ title, subtitle, rightIcon, onRightPress, style }) => (
  <CustomHeader
    title={title}
    subtitle={subtitle}
    rightIcon={rightIcon}
    onRightPress={onRightPress}
    style={style}
  />
);

CustomHeader.Modal = ({
  title,
  onClose,
  rightText,
  onRightPress,
  backgroundColor = COLORS.primary[500],
  textColor = COLORS.neutral[50],
  style
}) => (
  <CustomHeader
    title={title}
    showBackButton={false}
    rightIcon="close"
    onRightPress={onClose}
    rightText={rightText}
    onRightPressOverride={onRightPress}
    backgroundColor={backgroundColor}
    textColor={textColor}
    style={style}
  />
);

CustomHeader.Form = ({
  title,
  onCancel,
  onSave,
  isLoading = false,
  style
}) => (
  <CustomHeader
    title={title}
    showBackButton={true}
    rightText={isLoading ? 'Saving...' : 'Save'}
    onRightPress={onSave}
    style={style}
  />
);

const styles = StyleSheet.create({
  container: {
    height: LAYOUT.navigation.headerHeight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING[4],
    paddingTop: SPACING[2],
  },

  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SPACING[2],
  },

  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },

  backButton: {
    padding: SPACING[1],
    marginLeft: -SPACING[1], // Adjust for touch target
  },

  title: {
    ...TYPOGRAPHY.heading.h4,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    ...TYPOGRAPHY.body.small,
    textAlign: 'center',
    marginTop: SPACING[1],
    opacity: 0.8,
  },

  rightButton: {
    padding: SPACING[1],
  },

  rightText: {
    ...TYPOGRAPHY.ui.button.small,
    fontWeight: '600',
  },
});

export default CustomHeader;
