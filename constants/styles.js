import { StyleSheet } from 'react-native';
import { COLORS, SEMANTIC_COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING, BORDER_RADIUS, getShadow, LAYOUT } from './layout';

// Base Component Styles for Expense Tracker
export const BASE_STYLES = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.base,
    padding: SPACING[4],
    marginVertical: SPACING[2],
    marginHorizontal: SPACING[4],
    ...getShadow('sm'),
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  cardElevated: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING[5],
    marginVertical: SPACING[3],
    marginHorizontal: SPACING[4],
    ...getShadow('md'),
  },

  cardCompact: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING[3],
    marginVertical: SPACING[1],
    marginHorizontal: SPACING[2],
    ...getShadow('xs'),
  },

  // Button Base Styles
  button: {
    borderRadius: BORDER_RADIUS.sm,
    height: LAYOUT.button.height.md,
    paddingHorizontal: LAYOUT.button.padding.horizontal,
    paddingVertical: LAYOUT.button.padding.vertical,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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

  // Input Base Styles
  input: {
    height: LAYOUT.input.height,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: LAYOUT.input.padding.horizontal,
    paddingVertical: LAYOUT.input.padding.vertical,
    fontSize: TYPOGRAPHY.body.base.fontSize,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.primary,
  },

  inputFocused: {
    borderColor: SEMANTIC_COLORS.brand,
    borderWidth: 2,
  },

  inputError: {
    borderColor: SEMANTIC_COLORS.error,
  },

  inputDisabled: {
    backgroundColor: COLORS.neutral[50],
    color: COLORS.text.disabled,
  },

  // Text Styles (using typography system)
  textDisplayLarge: TYPOGRAPHY.display.large,
  textDisplayMedium: TYPOGRAPHY.display.medium,
  textDisplaySmall: TYPOGRAPHY.display.small,

  textHeading1: TYPOGRAPHY.heading.h1,
  textHeading2: TYPOGRAPHY.heading.h2,
  textHeading3: TYPOGRAPHY.heading.h3,
  textHeading4: TYPOGRAPHY.heading.h4,
  textHeading5: TYPOGRAPHY.heading.h5,
  textHeading6: TYPOGRAPHY.heading.h6,

  textBodyLarge: TYPOGRAPHY.body.large,
  textBody: TYPOGRAPHY.body.base,
  textBodySmall: TYPOGRAPHY.body.small,

  textButton: TYPOGRAPHY.ui.button.base,
  textLabel: TYPOGRAPHY.ui.label,
  textCaption: TYPOGRAPHY.ui.caption,
  textOverline: TYPOGRAPHY.ui.overline,

  // List Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING[3],
    paddingHorizontal: SPACING[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  listItemPressed: {
    backgroundColor: COLORS.neutral[50],
  },

  // Modal Styles
  modal: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: LAYOUT.modal.padding,
    margin: SPACING[4],
    maxHeight: '80%',
    ...getShadow('lg'),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header Styles
  header: {
    height: LAYOUT.navigation.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING[4],
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  headerTitle: {
    ...TYPOGRAPHY.heading.h4,
    color: COLORS.text.primary,
  },

  // Tab Bar Styles
  tabBar: {
    height: LAYOUT.navigation.tabBarHeight,
    flexDirection: 'row',
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    ...getShadow('sm'),
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING[2],
  },

  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: SEMANTIC_COLORS.brand,
  },

  // Badge Styles
  badge: {
    paddingHorizontal: SPACING[2],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: SEMANTIC_COLORS.brand,
    alignSelf: 'flex-start',
  },

  badgeText: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.inverse,
    fontWeight: '600',
  },

  badgeSuccess: {
    backgroundColor: SEMANTIC_COLORS.success,
  },

  badgeError: {
    backgroundColor: SEMANTIC_COLORS.error,
  },

  badgeWarning: {
    backgroundColor: SEMANTIC_COLORS.warning,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },

  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING[8],
  },

  emptyStateIcon: {
    marginBottom: SPACING[4],
    opacity: 0.5,
  },

  emptyStateTitle: {
    ...TYPOGRAPHY.heading.h3,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING[2],
  },

  emptyStateDescription: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    lineHeight: SPACING[6],
  },

  // Divider Styles
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
    marginVertical: SPACING[4],
  },

  dividerVertical: {
    width: 1,
    backgroundColor: COLORS.border.light,
    marginHorizontal: SPACING[4],
  },

  // Avatar Styles
  avatar: {
    width: SPACING[12],
    height: SPACING[12],
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarSmall: {
    width: SPACING[8],
    height: SPACING[8],
  },

  avatarLarge: {
    width: SPACING[16],
    height: SPACING[16],
  },

  // Chip/Tag Styles
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1.5],
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.neutral[100],
    alignSelf: 'flex-start',
  },

  chipText: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.secondary,
  },

  chipSelected: {
    backgroundColor: SEMANTIC_COLORS.brand,
  },

  chipSelectedText: {
    color: COLORS.text.inverse,
  },

  // FAB (Floating Action Button) Styles
  fab: {
    position: 'absolute',
    bottom: SPACING[6],
    right: SPACING[6],
    width: SPACING[14],
    height: SPACING[14],
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: SEMANTIC_COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow('lg'),
  },

  // Toast Styles
  toast: {
    position: 'absolute',
    top: SPACING[20],
    left: SPACING[4],
    right: SPACING[4],
    backgroundColor: COLORS.neutral[800],
    borderRadius: BORDER_RADIUS.base,
    padding: SPACING[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...getShadow('md'),
  },

  toastText: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.text.inverse,
    flex: 1,
    marginLeft: SPACING[3],
  },

  // Form Styles
  formGroup: {
    marginBottom: SPACING[4],
  },

  formLabel: {
    ...TYPOGRAPHY.ui.label,
    color: COLORS.text.primary,
    marginBottom: SPACING[2],
  },

  formError: {
    ...TYPOGRAPHY.ui.caption,
    color: SEMANTIC_COLORS.error,
    marginTop: SPACING[1],
  },

  // Utility Styles
  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  justifyAround: {
    justifyContent: 'space-around',
  },

  alignCenter: {
    alignItems: 'center',
  },

  alignStart: {
    alignItems: 'flex-start',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  flex1: {
    flex: 1,
  },

  flexWrap: {
    flexWrap: 'wrap',
  },
});

// Theme-aware style functions
export const createThemedStyles = (theme = 'light') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    // Dynamic theme styles would go here
    // For now, returning base styles
    ...BASE_STYLES,
  });
};

// Export individual style groups for easier access
export const {
  container,
  card,
  button,
  input,
  textBody,
  textHeading1,
  textHeading2,
  textHeading3,
  listItem,
  modal,
  header,
  badge,
  emptyState,
  divider,
  avatar,
  chip,
  fab,
  toast,
} = BASE_STYLES;
