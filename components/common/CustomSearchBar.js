import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import design system
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  LAYOUT,
  ICON_SIZES,
} from '../../constants';

const CustomSearchBar = ({
  value = '',
  onChangeText,
  placeholder = 'Search...',
  onSubmit,
  onClear,
  autoFocus = false,
  showSuggestions = false,
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  filterOptions = [], // Array of filter objects: { key, label, selected, onPress }
  onFilterChange,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Handle focus/blur
  const handleFocus = () => {
    setIsFocused(true);
    if (showSuggestions && suggestions.length > 0) {
      animateSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      if (!isFocused) {
        animateSuggestions(false);
      }
    }, 200);
  };

  // Animate suggestions dropdown
  const animateSuggestions = (show) => {
    Animated.timing(animatedHeight, {
      toValue: show ? Math.min(suggestions.length * 50, maxSuggestions * 50) : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Handle clear search
  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
    if (onClear) {
      onClear();
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
    inputRef.current?.blur();
  };

  // Toggle filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return filterOptions.filter(option => option.selected).length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <View style={[styles.container, style]}>
      {/* Search Input Container */}
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
      ]}>
        {/* Search Icon */}
        <Ionicons
          name="search"
          size={ICON_SIZES.base}
          color={isFocused ? COLORS.primary[500] : COLORS.neutral[400]}
          style={styles.searchIcon}
        />

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
          accessibilityLabel="Search input"
          accessibilityHint="Enter search terms"
          {...props}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {/* Clear Button */}
          {value.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={styles.actionButton}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
            >
              <Ionicons
                name="close-circle"
                size={ICON_SIZES.base}
                color={COLORS.neutral[400]}
              />
            </TouchableOpacity>
          )}

          {/* Filter Button */}
          {filterOptions.length > 0 && (
            <TouchableOpacity
              onPress={toggleFilters}
              style={styles.actionButton}
              accessibilityRole="button"
              accessibilityLabel="Toggle filters"
            >
              <Ionicons
                name="filter"
                size={ICON_SIZES.base}
                color={
                  activeFilterCount > 0
                    ? COLORS.primary[500]
                    : isFocused
                    ? COLORS.primary[500]
                    : COLORS.neutral[400]
                }
              />
              {activeFilterCount > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>
                    {activeFilterCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Active Filters Bar */}
      {showFilters && filterOptions.length > 0 && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters:</Text>
          <View style={styles.filterChips}>
            {filterOptions.map((filter, index) => (
              <TouchableOpacity
                key={filter.key || index}
                onPress={() => {
                  if (filter.onPress) {
                    filter.onPress(filter);
                  }
                  if (onFilterChange) {
                    onFilterChange(filter);
                  }
                }}
                style={[
                  styles.filterChip,
                  filter.selected && styles.filterChipSelected,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: filter.selected }}
                accessibilityLabel={`${filter.label} filter ${filter.selected ? 'selected' : 'not selected'}`}
              >
                <Text style={[
                  styles.filterChipText,
                  filter.selected && styles.filterChipTextSelected,
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <Animated.View style={[styles.suggestionsContainer, { height: animatedHeight }]}>
          <FlatList
            data={suggestions.slice(0, maxSuggestions)}
            keyExtractor={(item, index) => item.key || index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (onSuggestionPress) {
                    onSuggestionPress(item);
                  }
                  onChangeText(item.text || item);
                  animateSuggestions(false);
                  inputRef.current?.blur();
                }}
                style={styles.suggestionItem}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.text || item}`}
              >
                <Ionicons
                  name="search"
                  size={ICON_SIZES.sm}
                  color={COLORS.neutral[400]}
                  style={styles.suggestionIcon}
                />
                <Text style={styles.suggestionText}>
                  {item.text || item}
                </Text>
                {item.category && (
                  <Text style={styles.suggestionCategory}>
                    {item.category}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
      )}
    </View>
  );
};

// Compact Search Bar for headers
CustomSearchBar.Compact = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onSubmit,
  style,
  ...props
}) => (
  <View style={[styles.compactContainer, style]}>
    <CustomSearchBar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onSubmit={onSubmit}
      showSuggestions={false}
      filterOptions={[]}
      style={styles.compactSearchBar}
      inputStyle={styles.compactInput}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: BORDER_RADIUS.sm,
    height: LAYOUT.input.height,
    paddingHorizontal: SPACING[3],
  },

  inputContainerFocused: {
    borderColor: COLORS.primary[500],
    borderWidth: 2,
  },

  searchIcon: {
    marginRight: SPACING[2],
  },

  input: {
    flex: 1,
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.primary,
    paddingVertical: 0, // Remove default padding
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    padding: SPACING[1],
    marginLeft: SPACING[1],
  },

  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.primary[500],
    borderRadius: BORDER_RADIUS.full,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterBadgeText: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.neutral[50],
    fontSize: 10,
    fontWeight: '700',
  },

  filtersContainer: {
    marginTop: SPACING[3],
    padding: SPACING[3],
    backgroundColor: COLORS.neutral[50],
    borderRadius: BORDER_RADIUS.sm,
  },

  filtersTitle: {
    ...TYPOGRAPHY.ui.label,
    color: COLORS.text.secondary,
    marginBottom: SPACING[2],
  },

  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  filterChip: {
    backgroundColor: COLORS.neutral[200],
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1.5],
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING[2],
    marginBottom: SPACING[2],
  },

  filterChipSelected: {
    backgroundColor: COLORS.primary[500],
  },

  filterChipText: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.secondary,
  },

  filterChipTextSelected: {
    color: COLORS.neutral[50],
    fontWeight: '600',
  },

  suggestionsContainer: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderTopWidth: 0,
    borderBottomLeftRadius: BORDER_RADIUS.sm,
    borderBottomRightRadius: BORDER_RADIUS.sm,
    maxHeight: 250,
    overflow: 'hidden',
  },

  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING[3],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  suggestionIcon: {
    marginRight: SPACING[2],
  },

  suggestionText: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.primary,
    flex: 1,
  },

  suggestionCategory: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.tertiary,
  },

  // Compact styles
  compactContainer: {
    paddingHorizontal: SPACING[4],
    paddingVertical: SPACING[2],
    backgroundColor: COLORS.background.secondary,
  },

  compactSearchBar: {
    marginBottom: 0,
  },

  compactInput: {
    fontSize: 14,
  },
});

export default CustomSearchBar;
