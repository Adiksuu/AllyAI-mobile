import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, BackHandler } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import NavigationBar from "./NavigationBar";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import AccountManagementScreen from "./AccountManagementScreen";
import AIChatbotSettingsScreen from "./AIChatbotSettingsScreen";

const AppContainer = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [navigationStack, setNavigationStack] = useState([]);
    const { colors, getEffectiveTheme } = useTheme();

    const handleNavigateToChat = (chatId = null) => {
        setActiveTab("chat");
        // You can add logic here to handle specific chat loading
        if (chatId) {
            console.log("Loading chat:", chatId);
        }
    };

    const navigation = {
        navigate: (screenName) => {
            if (screenName === "AccountManagement") {
                setNavigationStack((prev) => [...prev, "AccountManagement"]);
            } else if (screenName === "AIChatbotSettings") {
                setNavigationStack((prev) => [...prev, "AIChatbotSettings"]);
            }
        },
        goBack: () => {
            setNavigationStack((prev) => prev.slice(0, -1));
        },
    };

    // Handle Android back button
    useEffect(() => {
        const backAction = () => {
            if (navigationStack.length > 0) {
                // If we're in a nested screen, go back to previous screen
                navigation.goBack();
                return true; // Prevent default behavior
            } else {
                // If we're on a main tab, let the default behavior happen (exit app)
                return false;
            }
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigationStack]);

    const renderScreen = () => {
        // Check if we're in a nested screen
        if (navigationStack.length > 0) {
            const currentScreen = navigationStack[navigationStack.length - 1];
            switch (currentScreen) {
                case "AccountManagement":
                    return <AccountManagementScreen navigation={navigation} />;
                case "AIChatbotSettings":
                    return <AIChatbotSettingsScreen navigation={navigation} />;
                default:
                    return (
                        <HomeScreen onNavigateToChat={handleNavigateToChat} />
                    );
            }
        }

        // Main tab screens
        switch (activeTab) {
            case "home":
                return <HomeScreen onNavigateToChat={handleNavigateToChat} />;
            case "chat":
                return <ChatScreen />;
            case "settings":
                return <SettingsScreen navigation={navigation} />;
            case "profile":
                return <ProfileScreen />;
            default:
                return <HomeScreen onNavigateToChat={handleNavigateToChat} />;
        }
    };

    const effectiveTheme = getEffectiveTheme();
    const statusBarStyle =
        effectiveTheme === "light" ? "dark-content" : "light-content";

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background.primary },
            ]}
        >
            <StatusBar
                barStyle={statusBarStyle}
                backgroundColor={colors.background.primary}
                translucent={false}
            />
            {renderScreen()}
            {navigationStack.length === 0 && (
                <NavigationBar
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppContainer;
