import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { colors } from "../api/theme/colors";
import NavigationBar from "./NavigationBar";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";

const AppContainer = () => {
    const [activeTab, setActiveTab] = useState("home");

    const handleNavigateToChat = (chatId = null) => {
        setActiveTab("chat");
        // You can add logic here to handle specific chat loading
        if (chatId) {
            console.log("Loading chat:", chatId);
        }
    };

    const renderScreen = () => {
        switch (activeTab) {
            case "home":
                return <HomeScreen onNavigateToChat={handleNavigateToChat} />;
            case "chat":
                return <ChatScreen />;
            case "settings":
                return <SettingsScreen />;
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
            <NavigationBar activeTab={activeTab} onTabPress={setActiveTab} />
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
