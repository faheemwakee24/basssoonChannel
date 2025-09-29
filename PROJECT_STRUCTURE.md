# Bassoon Channel - Project Structure Guide

This document explains the project structure and architecture for the Bassoon Channel React Native app.

## 📁 Project Structure

```
Bassoon_Channel/
├── android/                 # Native Android project (Gradle, manifests, native modules)
├── ios/                     # Native iOS project (Pods, configs, Swift/ObjC modules)
├── src/                     # All JS/TS app code lives here
│   ├── api/                 # API clients, GraphQL, Supabase, REST
│   │   └── auth.ts          # Authentication API client
│   ├── assets/              # Images, fonts, icons
│   │   ├── fonts/           # Custom font files
│   │   ├── images/          # Image assets
│   │   └── icons/           # Icon assets
│   ├── components/          # Shared reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── Input.tsx        # Custom input component
│   │   ├── Loader.tsx       # Loading components
│   │   └── index.ts         # Component exports
│   ├── config/              # App-wide config (env, constants)
│   │   ├── colors.ts        # Color scheme definitions
│   │   ├── constants.ts     # App constants and enums
│   │   ├── env.ts           # Environment configuration
│   │   ├── navigation.ts    # Navigation configuration
│   │   └── theme.ts         # Theme system and styling
│   ├── hooks/               # Reusable custom hooks
│   │   ├── useAuth.ts       # Authentication state management
│   │   ├── useNetwork.ts    # Network connectivity hook
│   │   └── useTheme.ts      # Theme management hook
│   ├── navigation/          # React Navigation setup
│   │   ├── AppNavigator.tsx # Main app navigator
│   │   ├── AuthNavigator.tsx# Authentication flow navigator
│   │   └── MainNavigator.tsx# Main app flow navigator
│   ├── screens/             # App screens grouped by feature
│   │   ├── Auth/            # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── Settings/        # Settings and profile screens
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── HomeScreen.tsx   # Main dashboard screen
│   │   └── index.ts         # Screen exports
│   ├── store/               # State management (Redux, Zustand, Jotai, or Recoil)
│   │   └── index.ts         # Store configuration and exports
│   ├── utils/               # Utility functions
│   │   ├── formatters.ts    # Data formatting utilities
│   │   └── validation.ts    # Form validation utilities
│   └── index.ts             # Main entry point for src exports
├── App.tsx                  # Main app component
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## 🏗️ Architecture Overview

### **1. Configuration Layer (`src/config/`)**
- **`colors.ts`** - Centralized color system with light/dark mode support
- **`theme.ts`** - Theme system with spacing, typography, and shadows
- **`constants.ts`** - App-wide constants, screen names, and validation rules
- **`env.ts`** - Environment configuration and feature flags
- **`navigation.ts`** - Navigation styling and configuration

### **2. State Management (`src/hooks/` & `src/store/`)**
- **`useAuth.ts`** - Authentication state and actions
- **`useTheme.ts`** - Theme management with context provider
- **`useNetwork.ts`** - Network connectivity monitoring
- **`store/index.ts`** - Centralized state exports

### **3. API Layer (`src/api/`)**
- **`auth.ts`** - Authentication API client with TypeScript interfaces
- Structured for easy extension with additional API endpoints

### **4. UI Components (`src/components/`)**
- **`Button.tsx`** - Customizable button with multiple variants
- **`Input.tsx`** - Form input with validation and styling
- **`Loader.tsx`** - Loading indicators and full-screen loader
- All components use the theme system for consistent styling

### **5. Navigation (`src/navigation/`)**
- **`AppNavigator.tsx`** - Root navigator with auth state management
- **`AuthNavigator.tsx`** - Authentication flow (Login, Register)
- **`MainNavigator.tsx`** - Main app flow with tab navigation

### **6. Screens (`src/screens/`)**
- Organized by feature/domain
- **`Auth/`** - Authentication related screens
- **`Settings/`** - User settings and profile screens
- Each screen follows consistent patterns and uses shared components

### **7. Utilities (`src/utils/`)**
- **`formatters.ts`** - Currency, date, phone number formatting
- **`validation.ts`** - Form validation rules and helpers

## 🎨 Design System

### **Color System**
- Primary colors (blue palette)
- Secondary colors (gray palette)
- Accent colors (purple, green, orange, red, pink)
- Semantic colors (success, warning, error, info)
- Light and dark mode support

### **Typography**
- Consistent font sizes (xs to xxxl)
- Font weights (normal, medium, semibold, bold)
- Responsive text scaling

### **Spacing**
- Consistent spacing scale (xs: 4px to xxxl: 48px)
- Used throughout components and screens

### **Components**
- All components accept `style` props for customization
- Consistent prop interfaces across components
- Theme-aware styling

## 🔧 Development Guidelines

### **Adding New Screens**
1. Create screen in appropriate folder under `src/screens/`
2. Add screen to navigation in `src/navigation/`
3. Export screen in `src/screens/index.ts`
4. Follow existing patterns for consistency

### **Adding New Components**
1. Create component in `src/components/`
2. Use theme system for styling
3. Add TypeScript interfaces for props
4. Export in `src/components/index.ts`

### **Adding New API Endpoints**
1. Add endpoint to `src/api/` (create new file if needed)
2. Define TypeScript interfaces for request/response
3. Follow existing patterns for error handling

### **State Management**
- Use custom hooks for state management
- Keep state close to where it's used
- Use context for global state (theme, auth)

### **Styling**
- Always use the theme system
- Use consistent spacing and colors
- Follow component patterns for consistency

## 📱 Features Implemented

- ✅ **Authentication Flow** - Login, Register, Logout
- ✅ **Theme System** - Light/Dark mode support
- ✅ **Navigation** - Stack and Tab navigation
- ✅ **Form Validation** - Comprehensive validation utilities
- ✅ **API Integration** - Structured API client
- ✅ **State Management** - Custom hooks pattern
- ✅ **UI Components** - Reusable, themeable components
- ✅ **TypeScript** - Full type safety

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Run on device:**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   ```

## 📝 Code Style

- Use TypeScript for all new files
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Use the theme system for all styling
- Add proper TypeScript interfaces

## 🔄 Future Enhancements

- Add more wallet-specific screens
- Implement real API integration
- Add more UI components
- Implement push notifications
- Add biometric authentication
- Add offline support

---

**Last Updated:** $(date)
**Maintainer:** Development Team
**Version:** 1.0.0
