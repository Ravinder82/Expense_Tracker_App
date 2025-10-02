# Expense Tracker App

A React Native expense tracking application built with Expo, designed with a **Crystalline Balanced Frosted Glassmorphism** aesthetic.

## ✨ Design Philosophy: Crystalline Glassmorphism

This project follows a specific and sophisticated design system called **Crystalline Balanced Frosted Glassmorphism**. This approach emphasizes:

- **Clarity and Precision**: We use sharp, well-defined glass panels with a subtle blur to maintain readability and a clean, modern feel.
- **Balanced Hierarchy**: Glass effects are used strategically to create a clear visual hierarchy, guiding the user's focus without overwhelming the interface.
- **Light and Structure**: The design is built on a foundation of light, transparency, and grid-based layouts to create a sense of order and depth.

This ensures a premium, intuitive, and visually stunning user experience across the entire application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Xcode (for iOS development)
- iOS Simulator or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ravinder82/Expense_Tracker_Latest.git
   cd Expense_Tracker_Latest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start --ios    # For iOS Simulator
   npx expo start --android # For Android Emulator
   npx expo start --web     # For Web
   ```

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### 1. "command not found: expo" Error
**Problem**: Expo CLI is not installed globally.

**Solution**:
```bash
# Option 1: Use npx (recommended)
npx expo start --ios

# Option 2: Install Expo CLI globally
npm install -g @expo/cli
expo start --ios
```

#### 2. React Version Mismatch Error
**Problem**: Error like "Incompatible React versions: The 'react' and 'react-native-renderer' packages must have the exact same version"

**Symptoms**:
```
ERROR [Error: Incompatible React versions: The "react" and "react-native-renderer" packages must have the exact same version. Instead got:
  - react:                  19.1.1
  - react-native-renderer:  19.1.0
```

**Solution**:
1. Update `package.json` with correct versions:
   ```json
   {
     "dependencies": {
       "expo": "54.0.12",
       "expo-router": "~6.0.10",
       "react": "19.1.0",
       "react-native": "0.81.4"
     }
   }
   ```
2. Install updated packages:
   ```bash
   npm install
   ```
3. Clear cache and restart:
   ```bash
   npx expo start --ios --clear
   ```

#### 3. Expo Package Version Warnings
**Problem**: Warning messages about outdated Expo packages.

**Symptoms**:
```
The following packages should be updated for best compatibility with the installed expo version:
  expo@54.0.10 - expected version: 54.0.12
  expo-router@6.0.8 - expected version: ~6.0.10
```

**Solution**: Update package.json with the recommended versions (see Solution #2 above).

#### 4. Interactive Prompts Blocking Startup
**Problem**: Expo asks for interactive input but you're running in non-interactive mode.

**Symptoms**:
```
CommandError: Input is required, but 'npx expo' is in non-interactive mode.
Required input:
> Expo Go 54.0.6 is recommended for SDK 54.0.0 (iPhone 11 is using 2.33.17).
```

**Solutions**:
```bash
# Option 1: Use --clear flag to avoid some prompts
npx expo start --ios --clear

# Option 2: Use development build instead of Expo Go
npx expo start --ios --dev-client

# Option 3: Run in interactive terminal
# Simply run: npx expo start --ios
# And respond to prompts manually
```

#### 5. Metro Bundler Issues
**Problem**: Metro bundler fails to start or build.

**Solution**:
1. Clear Metro cache:
   ```bash
   npx expo start --ios --clear
   ```

2. Reset Metro cache:
   ```bash
   npx react-native start --reset-cache
   ```

3. Clean node_modules:
   ```bash
   rm -rf node_modules
   npm install
   ```

#### 6. iOS Simulator Won't Start
**Problem**: iOS Simulator doesn't launch.

**Solutions**:
1. Make sure Xcode is installed and Simulator is available
2. Check if Simulator app is already running
3. Try opening Simulator manually first:
   ```bash
   open -a Simulator
   ```
4. Then run Expo:
   ```bash
   npx expo start --ios
   ```

#### 7. Port Already in Use
**Problem**: Port 8081 is already being used.

**Solution**:
```bash
# Kill process using port 8081
lsof -ti:8081 | xargs kill -9

# Or use a different port
npx expo start --ios --port 8082
```

#### 8. "Linking requires a build-time setting 'scheme'" Warning
**Problem**: Warning about missing URL scheme in Expo config.

**Symptoms**:
```
WARN Linking requires a build-time setting `scheme` in the project's Expo config (app.config.js or app.json) for production apps
```

**Solution**:
1. Add a `scheme` property to your `app.json`:
   ```json
   {
     "expo": {
       "name": "Expense_Tracker",
       "scheme": "expensetracker",
       // ... other config
     }
   }
   ```
2. Restart the development server:
   ```bash
   npx expo start --ios --clear
   ```

**Why it's needed**: The scheme enables deep linking - allowing other apps or websites to open your app using custom URLs like `expensetracker://some-path`.

## 📱 Features

- **Transaction Tracking**: Add, edit, and delete expense/income transactions
- **Budget Management**: Set and monitor spending budgets
- **Reports & Analytics**: View spending patterns and insights
- **Categories**: Organize transactions by categories
- **Multi-platform**: Works on iOS, Android, and Web

## 🏗️ Project Structure

```
Expense_Tracker_Latest/
├── app/
│   ├── _layout.js          # Root layout
│   ├── index.js            # Home screen
│   └── (tabs)/             # Tab-based navigation
│       ├── _layout.js      # Tab layout
│       ├── transactions.js # Transactions screen
│       ├── budgets.js      # Budgets screen
│       ├── reports.js      # Reports screen
│       └── settings.js     # Settings screen
├── components/             # Reusable components
├── constants/              # App constants (colors, styles, etc.)
├── assets/                 # Images and other assets
└── package.json
```

## 🛠️ Development Commands

```bash
# Start development server
npm run ios        # iOS Simulator
npm run android    # Android Emulator
npm run web        # Web browser

# Alternative commands
npx expo start --ios
npx expo start --android
npx expo start --web
```

## 📋 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **React Navigation** - Navigation library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

## ⚡ Quick Fix Commands

If you encounter startup issues, try this sequence:

```bash
# 1. Ensure correct package versions
npm install

# 2. Clear all caches
npx expo start --ios --clear

# 3. If still issues, clean everything
rm -rf node_modules
npm install
npx expo start --ios --clear
```

For any other issues, refer to the troubleshooting section above or check the [Expo documentation](https://docs.expo.dev/).
