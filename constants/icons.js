// Icon System for Expense Tracker
// Using Expo Vector Icons (Ionicons, MaterialIcons, etc.)

// Icon Size Scale
export const ICON_SIZES = {
  xs: 12,   // Extra small - inline text, metadata
  sm: 16,   // Small - buttons, form elements
  base: 20, // Base - standard icons
  lg: 24,   // Large - prominent icons
  xl: 32,   // Extra large - feature icons
  '2xl': 40, // 2X large - hero icons
  '3xl': 48, // 3X large - massive icons
};

// Icon Categories with consistent naming
export const ICONS = {
  // Navigation & UI
  navigation: {
    home: 'home-outline',
    menu: 'menu',
    back: 'arrow-back',
    close: 'close',
    search: 'search',
    filter: 'filter-list',
    settings: 'settings-outline',
    user: 'person-outline',
    notifications: 'notifications-outline',
  },

  // Actions
  actions: {
    add: 'add',
    edit: 'edit',
    delete: 'trash-outline',
    save: 'checkmark',
    cancel: 'close',
    share: 'share-outline',
    download: 'download-outline',
    upload: 'cloud-upload-outline',
    refresh: 'refresh',
    favorite: 'heart-outline',
    favoriteFilled: 'heart',
  },

  // Categories (Expense Types)
  categories: {
    food: 'restaurant-outline',
    transport: 'car-outline',
    shopping: 'bag-outline',
    entertainment: 'game-controller-outline',
    bills: 'receipt-outline',
    health: 'medical-outline',
    education: 'school-outline',
    travel: 'airplane-outline',
    groceries: 'basket-outline',
    coffee: 'cafe-outline',
    fuel: 'local-gas-station',
    utilities: 'flash-outline',
    insurance: 'shield-checkmark-outline',
    salary: 'wallet-outline',
    freelance: 'briefcase-outline',
    investment: 'trending-up-outline',
    other: 'help-circle-outline',
  },

  // Financial
  financial: {
    money: 'cash-outline',
    creditCard: 'card-outline',
    wallet: 'wallet-outline',
    bank: 'business-outline',
    transfer: 'swap-horizontal-outline',
    income: 'trending-up-outline',
    expense: 'trending-down-outline',
    budget: 'pie-chart-outline',
    savings: 'piggy-bank-outline',
    loan: 'calculator-outline',
  },

  // Time & Date
  time: {
    calendar: 'calendar-outline',
    clock: 'time-outline',
    today: 'today-outline',
    dateRange: 'calendar-clear-outline',
    recurring: 'repeat-outline',
    deadline: 'alarm-outline',
  },

  // Status & States
  status: {
    success: 'checkmark-circle-outline',
    error: 'close-circle-outline',
    warning: 'alert-circle-outline',
    info: 'information-circle-outline',
    loading: 'ellipsis-horizontal-circle',
    pending: 'time-outline',
    completed: 'checkmark-circle',
    active: 'radio-button-on',
    inactive: 'radio-button-off',
  },

  // Arrows & Directions
  arrows: {
    up: 'arrow-up',
    down: 'arrow-down',
    left: 'arrow-left',
    right: 'arrow-right',
    upCircle: 'arrow-up-circle',
    downCircle: 'arrow-down-circle',
    expand: 'chevron-down',
    collapse: 'chevron-up',
    next: 'chevron-forward',
    previous: 'chevron-back',
  },

  // Communication
  communication: {
    email: 'mail-outline',
    phone: 'call-outline',
    message: 'chatbubble-outline',
    notification: 'notifications-outline',
  },

  // Media & Files
  media: {
    image: 'image-outline',
    camera: 'camera-outline',
    photo: 'camera',
    attachment: 'attach-outline',
    document: 'document-outline',
    pdf: 'document-text-outline',
  },

  // Weather (for context/optional)
  weather: {
    sunny: 'sunny-outline',
    rainy: 'rainy-outline',
    cloudy: 'cloudy-outline',
  },
};

// Icon Sets Configuration
export const ICON_SETS = {
  primary: 'Ionicons',      // Main icon set
  material: 'MaterialIcons', // Alternative for specific icons
  community: 'MaterialCommunityIcons', // Community icons
};

// Icon Style Presets
export const ICON_STYLES = {
  // Default icon style
  default: {
    size: ICON_SIZES.base,
    color: '#64748b', // neutral-500
  },

  // Button icons
  button: {
    primary: {
      size: ICON_SIZES.sm,
      color: '#ffffff',
    },
    secondary: {
      size: ICON_SIZES.sm,
      color: '#3b82f6', // primary-500
    },
    ghost: {
      size: ICON_SIZES.sm,
      color: '#64748b', // neutral-500
    },
  },

  // Navigation icons
  navigation: {
    active: {
      size: ICON_SIZES.base,
      color: '#3b82f6', // primary-500
    },
    inactive: {
      size: ICON_SIZES.base,
      color: '#94a3b8', // neutral-400
    },
  },

  // Category icons
  category: {
    default: {
      size: ICON_SIZES.lg,
      color: '#64748b', // neutral-500
    },
    colored: {
      size: ICON_SIZES.lg,
      // Color will be determined by category
    },
  },

  // Status icons
  status: {
    success: {
      size: ICON_SIZES.base,
      color: '#22c55e', // secondary-500
    },
    error: {
      size: ICON_SIZES.base,
      color: '#ef4444', // error-500
    },
    warning: {
      size: ICON_SIZES.base,
      color: '#f59e0b', // warning-500
    },
    info: {
      size: ICON_SIZES.base,
      color: '#3b82f6', // primary-500
    },
  },
};

// Helper Functions
export const getIconConfig = (category, name, variant = 'default') => {
  const iconName = ICONS[category]?.[name];
  const styleConfig = ICON_STYLES[category]?.[variant] || ICON_STYLES.default;

  if (!iconName) {
    console.warn(`Icon not found: ${category}.${name}`);
    return {
      name: 'help-circle-outline',
      ...styleConfig,
    };
  }

  return {
    name: iconName,
    ...styleConfig,
  };
};

export const getCategoryIcon = (categoryName, isColored = false) => {
  const variant = isColored ? 'colored' : 'default';
  return getIconConfig('categories', categoryName, variant);
};

export const getStatusIcon = (status) => {
  return getIconConfig('status', status, status);
};

export const getNavigationIcon = (name, isActive = false) => {
  const variant = isActive ? 'active' : 'inactive';
  return getIconConfig('navigation', name, variant);
};

// Category Color Mapping for Icons
export const CATEGORY_COLORS = {
  food: '#ef4444',      // Red
  transport: '#3b82f6',  // Blue
  shopping: '#8b5cf6',   // Purple
  entertainment: '#f59e0b', // Orange
  bills: '#06b6d4',     // Cyan
  health: '#10b981',    // Green
  education: '#6366f1',  // Indigo
  travel: '#f97316',    // Orange-red
  groceries: '#84cc16',  // Lime
  coffee: '#dc2626',    // Red-600
  fuel: '#ea580c',      // Orange-600
  utilities: '#0891b2',  // Cyan-600
  insurance: '#059669',  // Emerald-600
  salary: '#22c55e',    // Green-500
  freelance: '#3b82f6',  // Blue-500
  investment: '#8b5cf6', // Purple-500
  other: '#6b7280',     // Gray-500
};

// Export commonly used icons for easy access
export const {
  navigation,
  actions,
  categories,
  financial,
  time,
  status,
  arrows,
  communication,
  media,
} = ICONS;
