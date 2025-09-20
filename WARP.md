# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AllyAI Mobile is a React Native application built with Expo that provides an AI chatbot experience. The app integrates with Google's Generative AI (Gemini), Firebase for authentication and database, and Cloudinary for image uploads. It features multilingual support, customizable AI personalities, and comprehensive user management.

## Key Commands

### Development
```bash
# Start development server
npm start

# Start for specific platforms
npm run android
npm run ios
npm run web

# Install dependencies
npm install
```

### EAS (Expo Application Services)
```bash
# Build for development
eas build --profile development

# Build for preview
eas build --profile preview

# Build for production
eas build --profile production

# Check build status
eas build:list
```

### Testing
```bash
# The project currently doesn't have explicit test scripts
# Tests should be added using Jest/React Native Testing Library
```

## Architecture Overview

### Core Structure
- **App.js**: Root component with Sentry error tracking, notification setup, and context providers
- **views/AppContainer.js**: Main container managing navigation, authentication state, and screen rendering
- **contexts/**: React contexts for global state management (Theme, Translation)
- **functions/**: Business logic modules (auth, chat, notifications, stats)
- **api/**: External service configurations (Firebase, theme colors)
- **components/**: Reusable UI components organized by functionality
- **translations/**: Internationalization files (English and Polish)

### State Management Architecture
The app uses React Context for global state:
- **ThemeContext**: Manages light/dark/auto theme switching with AsyncStorage persistence
- **TranslationContext**: Handles language switching between English and Polish

### Navigation System
Custom navigation implementation without React Navigation:
- Tab-based navigation with 4 main screens (Home, Chat, Settings, Profile)
- Stack-based navigation for nested screens using `navigationStack` state
- Android hardware back button handling

### Authentication Flow
Firebase Authentication with:
- Email/password registration and login
- Persistent authentication state using AsyncStorage
- User settings stored in Firebase Realtime Database
- Last login tracking and user statistics

### Chat System Architecture
- **AI Integration**: Google Generative AI (Gemini) with multiple model support (ALLY-3 default)
- **Image Support**: Cloudinary integration for image uploads in chat
- **Chat History**: Firebase Realtime Database storage with conversation management
- **Dynamic Personalities**: User-configurable AI personalities and response styles

## Key Configuration Files

### Firebase Configuration
- Located in `api/firebase/config.js`
- Configured for EU West region database
- Uses React Native persistence with AsyncStorage

### Expo Configuration
- `app.json`: Contains app metadata, permissions, and API keys
- `eas.json`: EAS build configurations for development, preview, and production
- **Security Note**: API keys are exposed in `app.json` - consider using environment variables for production

### Metro Configuration
- Uses Sentry's Expo configuration for bundle processing and source maps

## Environment Variables
The app expects these environment variables (currently in `app.json`):
- `GEMINI_API_KEY`: Google Generative AI API key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Key Features Implementation

### Theming System
- Dynamic theme switching (light/dark/auto)
- System theme detection with Appearance API
- Theme colors defined in `api/theme/colors.js`
- Persistent theme selection

### Internationalization
- Translation system with context-based key lookup
- Currently supports English (en) and Polish (pl)
- Extensible for additional languages

### Offline Handling
- Network connectivity detection with @react-native-community/netinfo
- Dedicated NoInternetScreen when offline
- AsyncStorage for offline data persistence

### Onboarding Flow
- First-time user onboarding screen
- AsyncStorage tracking of onboarding completion
- Can be reset for testing by clearing AsyncStorage

## Development Patterns

### Component Structure
- Modal components follow a pattern: `Modal.js` (wrapper) + `ModalContent.js` (content)
- Screen components are in `views/` directory
- Reusable components in `components/` with barrel exports via `index.js`

### Error Handling
- Sentry integration for crash reporting and session replay
- Firebase errors handled with user-friendly messages
- Network error detection and retry mechanisms

### Data Flow
- Firebase Realtime Database for real-time chat and user data
- AsyncStorage for offline persistence (theme, language, onboarding)
- Context providers for global state distribution

## Common Development Tasks

### Adding New Screens
1. Create screen component in `views/`
2. Add navigation logic in `AppContainer.js`
3. Update navigation methods if needed
4. Export from `views/index.js`

### Adding New Languages
1. Create new translation file in `translations/` (e.g., `fr.js`)
2. Export from `translations/index.js`
3. Add language option to `TranslationContext`

### Modifying AI Behavior
- Edit system instructions in `functions/chat.js`
- User settings affect AI personality and response style
- Model selection impacts AI capabilities

### Testing Offline Features
- Use device/simulator network settings to disable internet
- Test AsyncStorage persistence
- Verify NoInternetScreen appears correctly

## Firebase Database Structure
- `/users/{uid}/`: User profiles and settings
- `/chats/{uid}/`: Chat history and messages

## Security Considerations
- API keys should be moved to environment variables for production builds
- Firebase security rules should restrict access to user's own data
- Cloudinary upload presets should be configured securely

## Build and Deployment
- Uses EAS for building and distribution
- Development builds include dev client for debugging
- Production builds auto-increment version numbers
- Supports Android edge-to-edge display