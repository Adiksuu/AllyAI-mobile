import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useTheme } from "../contexts/ThemeContext";
import { onAuthStateChanged, updateUserLastLogin } from "../functions/auth";
import NavigationBar from "./NavigationBar";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import AccountManagementScreen from "./AccountManagementScreen";
import AIChatbotSettingsScreen from "./AIChatbotSettingsScreen";
import LoginRegisterScreen from "./LoginRegisterScreen";
import OnboardingScreen from "./OnboardingScreen";
import NoInternetScreen from "./NoInternetScreen";

const ONBOARDING_COMPLETED_KEY = "@allyai_onboarding_completed";

const AppContainer = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [navigationStack, setNavigationStack] = useState([]);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasUpdatedLastLogin, setHasUpdatedLastLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [selectedModel, setSelectedModel] = useState("ALLY-3");
    const [isConnected, setIsConnected] = useState(true);
    const { colors, getEffectiveTheme } = useTheme();

    const handleNavigateToChat = (chatId = null, model = "ALLY-3") => {
        setActiveTab("chat");
        setCurrentChatId(chatId);
        setSelectedModel(model);
        // You can add logic here to handle specific chat loading
        if (chatId) {
            console.log("Loading chat:", chatId);
        }
        console.log("Selected model:", model);
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

    const checkConnection = async () => {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
    };

    const navigation = {
        navigate: (screenName) => {
            if (screenName === "AccountManagement") {
                setNavigationStack((prev) => [...prev, "AccountManagement"]);
            } else if (screenName === "AIChatbotSettings") {
                setNavigationStack((prev) => [...prev, "AIChatbotSettings"]);
            } else if (screenName === "LoginRegister") {
                setNavigationStack((prev) => [...prev, "LoginRegister"]);
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

    // Listen to authentication state changes and update last login time once per session
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => {
            if (user) {
                setIsAuthenticated(true);
                if (!hasUpdatedLastLogin) {
                    // User is logged in and we haven't updated last login time yet
                    await updateUserLastLogin(user.uid);
                    setHasUpdatedLastLogin(true);
                }
            } else {
                // User is not logged in
                setIsAuthenticated(false);
                setHasUpdatedLastLogin(false);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, [hasUpdatedLastLogin]);

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

    // Network connection listener
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    const renderScreen = () => {
        // Check if we're in a nested screen
        if (navigationStack.length > 0) {
            const currentScreen = navigationStack[navigationStack.length - 1];
            switch (currentScreen) {
                case "AccountManagement":
                    return <AccountManagementScreen navigation={navigation} />;
                case "AIChatbotSettings":
                    return <AIChatbotSettingsScreen navigation={navigation} />;
                case "LoginRegister":
                    return <LoginRegisterScreen navigation={navigation} />;
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
                return <ChatScreen navigation={navigation} chatId={currentChatId} selectedModel={selectedModel} />;
            case "settings":
                return <SettingsScreen navigation={navigation} isAuthenticated={isAuthenticated} />;
            case "profile":
                return <ProfileScreen navigation={navigation} isAuthenticated={isAuthenticated} />;
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

    // Show no internet screen if not connected
    if (!isConnected) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
                <StatusBar
                    barStyle={statusBarStyle}
                    backgroundColor={colors.background.primary}
                    translucent={false}
                />
                <NoInternetScreen onRetry={checkConnection} />
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
