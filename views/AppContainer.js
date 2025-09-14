import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";
import NavigationBar from "./NavigationBar";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import AccountManagementScreen from "./AccountManagementScreen";
import AIChatbotSettingsScreen from "./AIChatbotSettingsScreen";
import OnboardingScreen from "./OnboardingScreen";

const ONBOARDING_COMPLETED_KEY = "@allyai_onboarding_completed";

const AppContainer = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [navigationStack, setNavigationStack] = useState([]);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { colors, getEffectiveTheme } = useTheme();

    const handleNavigateToChat = (chatId = null) => {
        setActiveTab("chat");
        // You can add logic here to handle specific chat loading
        if (chatId) {
            console.log("Loading chat:", chatId);
        }
    };

    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
            setHasCompletedOnboarding(true);
        } catch (error) {
            console.error("Error saving onboarding completion:", error);
            setHasCompletedOnboarding(true); // Still proceed
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

    // Check onboarding status on app start
    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
                setHasCompletedOnboarding(completed === "true");
            } catch (error) {
                console.error("Error checking onboarding status:", error);
                setHasCompletedOnboarding(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkOnboardingStatus();
    }, []);

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

    // Show loading screen while checking onboarding status
    if (isLoading) {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background.primary, justifyContent: "center", alignItems: "center" },
                ]}
            >
                <StatusBar
                    barStyle={statusBarStyle}
                    backgroundColor={colors.background.primary}
                    translucent={false}
                />
            </View>
        );
    }

    // Show onboarding if not completed
    if (!hasCompletedOnboarding) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
                <StatusBar
                    barStyle={statusBarStyle}
                    backgroundColor={colors.background.primary}
                    translucent={false}
                />
                <OnboardingScreen onComplete={handleOnboardingComplete} />
            </View>
        );
    }

    // Main app
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
