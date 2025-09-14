import { en } from "./en";
import { pl } from "./pl";

export const translations = {
    en,
    pl,
};

export const getTranslation = (language, key) => {
    const translation = translations[language] || translations.en;

    // Navigate through nested keys (e.g., "settings.title")
    const keys = key.split(".");
    let result = translation;

    // Try current language first
    for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
            result = result[k];
        } else {
            // Key not found in current language, try English fallback
            result = translations.en;
            for (const fallbackKey of keys) {
                if (
                    result &&
                    typeof result === "object" &&
                    fallbackKey in result
                ) {
                    result = result[fallbackKey];
                } else {
                    // Key not found in English either, return the key
                    console.warn(`Translation key not found: ${key}`);
                    return key;
                }
            }
            break;
        }
    }

    // Ensure we return a string, not an object
    if (typeof result === "object") {
        console.warn(`Translation key returns object instead of string: ${key}`);
        return key;
    }

    return result;
};

export const getAvailableLanguages = () => {
    return [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "pl", name: "Polski", flag: "🇵🇱" },
    ];
};
