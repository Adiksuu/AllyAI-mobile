# Views Directory

This directory contains all the main screen components and navigation structure for the AllyAI Mobile app.

## Components

### Navigation

-   **AppContainer.js** - Main container that manages navigation state and renders screens
-   **NavigationBar.js** - Bottom navigation bar with modern AI terminal styling

### Screens

-   **HomeScreen.js** - Main dashboard with terminal-style interface
-   **ChatScreen.js** - AI chat interface
-   **SettingsScreen.js** - App settings and configuration
-   **ProfileScreen.js** - User profile and account management

## Styling

All components use the centralized color scheme from `../api/theme/colors.js` which provides:

-   Black primary theme
-   Light blue accents (#00d4ff)
-   Darker blue secondary colors
-   Terminal-style aesthetics

## Navigation

The app uses a simple tab-based navigation system with 4 main tabs:

1. Home - Dashboard and quick actions
2. Chat - AI conversation interface
3. Settings - App configuration
4. Profile - User account management

## Icons

All icons are from `@expo/vector-icons` using the Ionicons set for consistency.
