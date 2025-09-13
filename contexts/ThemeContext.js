import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "@allyai_theme";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState("auto");
    const [isLoading, setIsLoading] = useState(true);

    // Load theme from AsyncStorage on app start
    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                setCurrentTheme(savedTheme);
            }
        } catch (error) {
            console.error("Error loading theme from storage:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const changeTheme = async (theme) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
            setCurrentTheme(theme);
            console.log("Theme saved to storage:", theme);
        } catch (error) {
            console.error("Error saving theme to storage:", error);
        }
    };

    const getThemeDisplayName = (themeCode) => {
        const themeNames = {
            light: "Light",
            dark: "Dark",
            auto: "Auto",
        };
        return themeNames[themeCode] || "Auto";
    };

    const value = {
        currentTheme,
        changeTheme,
        getThemeDisplayName,
        isLoading,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
