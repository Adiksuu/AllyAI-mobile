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

    for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
            result = result[k];
        } else {
            // Fallback to English if key not found
            result = translations.en;
            for (const fallbackKey of keys) {
                if (
                    result &&
                    typeof result === "object" &&
                    fallbackKey in result
                ) {
                    result = result[fallbackKey];
                } else {
                    return key; // Return the key itself if not found anywhere
                }
            }
            break;
        }
    }

    return result;
};

export const getAvailableLanguages = () => {
    return [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "pl", name: "Polski", flag: "🇵🇱" },
    ];
};
