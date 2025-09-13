// Color schemes for AllyAI Mobile
// Support for both light and dark themes

const darkTheme = {
    // Primary colors - Dark theme
    primary: {
        black: "#030303",
        darkGray: "#1a1a1a",
        mediumGray: "#2d2d2d",
        lightGray: "#404040",
    },

    // Accent colors - Light blue
    accent: {
        lightBlue: "#00d4ff",
        brightBlue: "#0099cc",
        cyan: "#00ffff",
    },

    // Secondary colors - Darker blue
    secondary: {
        darkBlue: "#003d5c",
        navy: "#001a2e",
        deepBlue: "#002244",
    },

    // Text colors
    text: {
        primary: "#ffffff",
        secondary: "#b3b3b3",
        muted: "#666666",
        accent: "#00d4ff",
    },

    // Background colors
    background: {
        primary: "#0f0f0f",
        secondary: "#1a1a1a",
        tertiary: "#2d2d2d",
        card: "#1a1a1a",
    },

    // Border colors
    border: {
        primary: "#404040",
        secondary: "#2d2d2d",
        accent: "#00d4ff",
    },

    // Status colors
    status: {
        success: "#00ff88",
        warning: "#ffaa00",
        error: "#ff4444",
        info: "#00d4ff",
    },

    // Navigation specific
    navigation: {
        background: "#030303",
        activeTab: "#00d4ff",
        inactiveTab: "#666666",
        border: "#2d2d2d",
    },

    // Terminal-like colors
    terminal: {
        background: "#030303",
        text: "#00ff00",
        cursor: "#00d4ff",
        selection: "#003d5c",
    },
};

const lightTheme = {
    // Primary colors - Light theme
    primary: {
        black: "#ffffff",
        darkGray: "#f5f5f5",
        mediumGray: "#e0e0e0",
        lightGray: "#cccccc",
    },

    // Accent colors - Blue (same as dark theme)
    accent: {
        lightBlue: "#007AFF",
        brightBlue: "#0056CC",
        cyan: "#00BFFF",
    },

    // Secondary colors - Lighter blue
    secondary: {
        darkBlue: "#E3F2FD",
        navy: "#F3F8FF",
        deepBlue: "#E8F4FD",
    },

    // Text colors
    text: {
        primary: "#000000",
        secondary: "#4A4A4A",
        muted: "#8E8E93",
        accent: "#007AFF",
    },

    // Background colors
    background: {
        primary: "#ffffff",
        secondary: "#f8f9fa",
        tertiary: "#e9ecef",
        card: "#ffffff",
    },

    // Border colors
    border: {
        primary: "#E0E0E0",
        secondary: "#F0F0F0",
        accent: "#007AFF",
    },

    // Status colors
    status: {
        success: "#34C759",
        warning: "#FF9500",
        error: "#FF3B30",
        info: "#007AFF",
    },

    // Navigation specific
    navigation: {
        background: "#ffffff",
        activeTab: "#007AFF",
        inactiveTab: "#8E8E93",
        border: "#E0E0E0",
    },

    // Terminal-like colors
    terminal: {
        background: "#ffffff",
        text: "#007AFF",
        cursor: "#007AFF",
        selection: "#E3F2FD",
    },
};

// Theme selector function
export const getThemeColors = (theme = "dark") => {
    switch (theme) {
        case "light":
            return lightTheme;
        case "dark":
        default:
            return darkTheme;
    }
};

// Default export for backward compatibility
export const colors = darkTheme;

export default colors;
