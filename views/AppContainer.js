Aimport React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, BackHandler } from "react-native";
import { colors } from "../api/theme/colors";
import NavigationBar from "./NavigationBar";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import AccountManagementScreen from "./AccountManagementScreen";

const AppContainer = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [navigationStack, setNavigationStack] = useState([]);

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

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
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
        backgroundColor: colors.background.primary,
    },
});

export default AppContainer;
