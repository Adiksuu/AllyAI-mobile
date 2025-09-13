# Translation System

This directory contains the translation system for the AllyAI mobile app, providing full internationalization support.

## Structure

```
translations/
├── index.js          # Main translation exports and utilities
├── en.js            # English translations
├── pl.js            # Polish translations
└── README.md        # This file
```

## Usage

### 1. Using the Translation Hook

```javascript
import { useTranslation } from "../contexts/TranslationContext";

const MyComponent = () => {
    const { t, currentLanguage, changeLanguage } = useTranslation();

    return <Text>{t("settings.title")}</Text>;
};
```

### 2. Translation Keys

Translation keys use dot notation for nested objects:

```javascript
// For this translation structure:
{
    settings: {
        title: "Settings",
        account: {
            title: "Account",
            subtitle: "Manage your account"
        }
    }
}

// Use these keys:
t('settings.title')           // "Settings"
t('settings.account.title')   // "Account"
t('settings.account.subtitle') // "Manage your account"
```

### 3. Adding New Languages

1. Create a new file `translations/[language-code].js`
2. Copy the structure from `en.js` and translate all values
3. Add the language to `translations/index.js`:

```javascript
import { newLanguage } from "./newLanguage";

export const translations = {
    en,
    es,
    fr,
    newLanguageCode: newLanguage, // Add here
};
```

### 4. Adding New Translation Keys

1. Add the key to all language files (`en.js`, `pl.js`)
2. Use the key in your components with `t('your.new.key')`

## Available Languages

-   **English (en)** - Complete
-   **Polish (pl)** - Complete

## Features

-   ✅ **Automatic Fallback**: Falls back to English if translation key not found
-   ✅ **Persistent Storage**: Language choice saved using AsyncStorage
-   ✅ **Context Management**: Global state management with React Context
-   ✅ **Type Safety**: Consistent key structure across all languages
-   ✅ **Easy Integration**: Simple hook-based API

## Context Provider

The app is wrapped with `TranslationProvider` in `App.js`:

```javascript
import { TranslationProvider } from "./contexts/TranslationContext";

export default function App() {
    return (
        <TranslationProvider>
            <AppContainer />
        </TranslationProvider>
    );
}
```

## Language Selection

Users can change language through:

1. Settings → Language
2. Language modal with visual language selection
3. Automatic persistence across app restarts

## Best Practices

1. **Use descriptive keys**: `settings.account.title` instead of `title1`
2. **Group related translations**: Keep related text under the same parent key
3. **Test all languages**: Ensure UI works with different text lengths
4. **Keep keys consistent**: Use the same key structure across all language files
5. **Add new keys to all languages**: Don't leave any language file incomplete
