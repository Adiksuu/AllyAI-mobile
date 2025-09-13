import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTranslation, getAvailableLanguages } from "../translations";

const TranslationContext = createContext();

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error(
            "useTranslation must be used within a TranslationProvider"
        );
    }
    return context;
};

export const TranslationProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState("en");
    const [isLoading, setIsLoading] = useState(true);

    // Load saved language on app start
    useEffect(() => {
        const loadSavedLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(
                    "selectedLanguage"
                );
                if (savedLanguage) {
                    setCurrentLanguage(savedLanguage);
                }
            } catch (error) {
                console.error("Error loading saved language:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSavedLanguage();
    }, []);

    const changeLanguage = async (languageCode) => {
        try {
            await AsyncStorage.setItem("selectedLanguage", languageCode);
            setCurrentLanguage(languageCode);
        } catch (error) {
            console.error("Error saving language:", error);
        }
    };

    const t = (key) => {
        return getTranslation(currentLanguage, key);
    };

    const getLanguages = () => {
        return getAvailableLanguages();
    };

    const value = {
        currentLanguage,
        changeLanguage,
        t,
        getLanguages,
        isLoading,
    };

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
};
