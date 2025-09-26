import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components
import CustomModal from './CustomModal';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

// Import design system
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  ICON_SIZES,
} from '../../constants';

const CustomFilterModal = ({
  visible,
  onClose,
  title = 'Filter Options',
  filters = [],
  onApplyFilters,
  onResetFilters,
  initialFilters = {},
  ...props
}) => {
  const [filterValues, setFilterValues] = useState(initialFilters);

  // Update filter values when modal opens or initial filters change
  useEffect(() => {
    if (visible) {
      setFilterValues(initialFilters);
    }
  }, [visible, initialFilters]);

  // Handle filter value change
  const handleFilterChange = (filterKey, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Handle apply filters
  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filterValues);
    }
    onClose();
  };

  // Handle reset filters
  const handleReset = () => {
    const resetValues = {};
    filters.forEach(filter => {
      resetValues[filter.key] = filter.defaultValue || null;
    });
    setFilterValues(resetValues);
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.some(filter => {
      const value = filterValues[filter.key];
      const defaultValue = filter.defaultValue || null;
      return value !== defaultValue;
    });
  };

  // Render different filter types
  const renderFilter = (filter) => {
    const value = filterValues[filter.key];
    const isActive = value !== (filter.defaultValue || null);

    switch (filter.type) {
      case 'select':
        return (
          <View key={filter.key} style={styles.filterGroup}>
            <Text style={styles.filterLabel}>{filter.label}</Text>
            <View style={styles.optionsContainer}>
              {filter.options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleFilterChange(filter.key, option.value)}
                  style={[
                    styles.optionButton,
                    value === option.value && styles.optionButtonSelected,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: value === option.value }}
                  accessibilityLabel={`${option.label} ${value === option.value ? 'selected' : 'not selected'}`}
                >
                  <Text style={[
                    styles.optionText,
                    value === option.value && styles.optionTextSelected,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'multiselect':
        return (
          <View key={filter.key} style={styles.filterGroup}>
            <Text style={styles.filterLabel}>{filter.label}</Text>
            <View style={styles.chipContainer}>
              {filter.options.map((option) => {
                const isSelected = value?.includes(option.value);
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      const currentValues = value || [];
                      const newValues = isSelected
                        ? currentValues.filter(v => v !== option.value)
                        : [...currentValues, option.value];
                      handleFilterChange(filter.key, newValues.length > 0 ? newValues : null);
                    }}
                    style={[
                      styles.chip,
                      isSelected && styles.chipSelected,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${option.label} ${isSelected ? 'selected' : 'not selected'}`}
                  >
                    <Text style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 'range':
        return (
          <View key={filter.key} style={styles.filterGroup}>
            <Text style={styles.filterLabel}>{filter.label}</Text>
            <View style={styles.rangeContainer}>
              <CustomInput
                placeholder={`Min ${filter.unit || ''}`}
                value={value?.min?.toString() || ''}
                onChangeText={(text) => {
                  const numValue = text ? parseFloat(text) : null;
                  handleFilterChange(filter.key, {
                    ...value,
                    min: numValue,
                  });
                }}
                keyboardType="numeric"
                style={styles.rangeInput}
              />
              <Text style={styles.rangeSeparator}>to</Text>
              <CustomInput
                placeholder={`Max ${filter.unit || ''}`}
                value={value?.max?.toString() || ''}
                onChangeText={(text) => {
                  const numValue = text ? parseFloat(text) : null;
                  handleFilterChange(filter.key, {
                    ...value,
                    max: numValue,
                  });
                }}
                keyboardType="numeric"
                style={styles.rangeInput}
              />
            </View>
          </View>
        );

      case 'date':
        return (
          <View key={filter.key} style={styles.filterGroup}>
            <Text style={styles.filterLabel}>{filter.label}</Text>
            <View style={styles.dateContainer}>
              <TouchableOpacity
                onPress={() => {
                  // Implement date picker here
                  console.log('Date picker for', filter.key);
                }}
                style={styles.dateButton}
                accessibilityRole="button"
                accessibilityLabel={`Select ${filter.label.toLowerCase()}`}
              >
                <Ionicons
                  name="calendar-outline"
                  size={ICON_SIZES.base}
                  color={COLORS.neutral[500]}
                  style={styles.dateIcon}
                />
                <Text style={styles.dateText}>
                  {value ? new Date(value).toLocaleDateString() : `Select ${filter.label.toLowerCase()}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'toggle':
        return (
          <View key={filter.key} style={styles.filterGroup}>
            <View style={styles.toggleContainer}>
              <Text style={styles.filterLabel}>{filter.label}</Text>
              <TouchableOpacity
                onPress={() => handleFilterChange(filter.key, !value)}
                style={[
                  styles.toggleButton,
                  value && styles.toggleButtonActive,
                ]}
                accessibilityRole="switch"
                accessibilityState={{ checked: value }}
                accessibilityLabel={filter.label}
              >
                <View style={[
                  styles.toggleIndicator,
                  value && styles.toggleIndicatorActive,
                ]} />
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title={title}
      size="large"
      {...props}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersTitle}>Active Filters:</Text>
            <View style={styles.activeFiltersList}>
              {filters.map((filter) => {
                const value = filterValues[filter.key];
                const isActive = value !== (filter.defaultValue || null);
                if (!isActive) return null;

                return (
                  <View key={filter.key} style={styles.activeFilterItem}>
                    <Text style={styles.activeFilterLabel}>{filter.label}:</Text>
                    <Text style={styles.activeFilterValue}>
                      {getFilterValueDisplay(filter, value)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Filter Options */}
        {filters.map(renderFilter)}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <CustomButton
          title="Reset"
          onPress={handleReset}
          variant="ghost"
          style={styles.resetButton}
        />
        <CustomButton
          title="Apply Filters"
          onPress={handleApply}
          style={styles.applyButton}
        />
      </View>
    </CustomModal>
  );
};

// Helper function to display filter values
const getFilterValueDisplay = (filter, value) => {
  switch (filter.type) {
    case 'select':
      const option = filter.options.find(opt => opt.value === value);
      return option ? option.label : value;

    case 'multiselect':
      if (!value || value.length === 0) return 'None';
      const selectedOptions = filter.options.filter(opt => value.includes(opt.value));
      return selectedOptions.map(opt => opt.label).join(', ');

    case 'range':
      if (!value) return 'Any';
      const min = value.min ? `${value.min}${filter.unit || ''}` : '0';
      const max = value.max ? `${value.max}${filter.unit || ''}` : '∞';
      return `${min} - ${max}`;

    case 'date':
      return value ? new Date(value).toLocaleDateString() : 'Any date';

    case 'toggle':
      return value ? 'Yes' : 'No';

    default:
      return value?.toString() || 'Any';
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  activeFiltersContainer: {
    backgroundColor: COLORS.primary[50],
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING[4],
  },

  activeFiltersTitle: {
    ...TYPOGRAPHY.ui.label,
    color: COLORS.primary[700],
    marginBottom: SPACING[2],
  },

  activeFiltersList: {
    gap: SPACING[1],
  },

  activeFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activeFilterLabel: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.primary[600],
    fontWeight: '600',
    marginRight: SPACING[2],
  },

  activeFilterValue: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.primary[800],
  },

  filterGroup: {
    marginBottom: SPACING[4],
  },

  filterLabel: {
    ...TYPOGRAPHY.ui.label,
    color: COLORS.text.primary,
    marginBottom: SPACING[2],
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING[2],
  },

  optionButton: {
    backgroundColor: COLORS.neutral[100],
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[2],
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  optionButtonSelected: {
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[500],
  },

  optionText: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.text.secondary,
  },

  optionTextSelected: {
    color: COLORS.neutral[50],
    fontWeight: '600',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING[2],
  },

  chip: {
    backgroundColor: COLORS.neutral[100],
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1.5],
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  chipSelected: {
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[500],
  },

  chipText: {
    ...TYPOGRAPHY.ui.caption,
    color: COLORS.text.secondary,
  },

  chipTextSelected: {
    color: COLORS.neutral[50],
    fontWeight: '600',
  },

  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING[2],
  },

  rangeInput: {
    flex: 1,
  },

  rangeSeparator: {
    ...TYPOGRAPHY.body.small,
    color: COLORS.text.tertiary,
  },

  dateContainer: {
    // Container for date picker
  },

  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING[3],
    backgroundColor: COLORS.neutral[50],
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  dateIcon: {
    marginRight: SPACING[2],
  },

  dateText: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.secondary,
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.neutral[300],
    padding: 2,
    justifyContent: 'center',
  },

  toggleButtonActive: {
    backgroundColor: COLORS.primary[500],
  },

  toggleIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.neutral[50],
    transform: [{ translateX: 0 }],
  },

  toggleIndicatorActive: {
    transform: [{ translateX: 22 }],
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING[4],
    paddingTop: SPACING[4],
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },

  resetButton: {
    flex: 1,
    marginRight: SPACING[2],
  },

  applyButton: {
    flex: 1,
    marginLeft: SPACING[2],
  },
});

export default CustomFilterModal;
