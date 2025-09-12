import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../api/theme/colors";
import { NewChatButton, PremiumUpgrade, ChatHistoryList } from "../components";

const HomeScreen = ({ onNavigateToChat }) => {
    const handleNewChat = () => {
        if (onNavigateToChat) {
            onNavigateToChat();
        }
    };

    const handleChatPress = (chatId) => {
        if (onNavigateToChat) {
            onNavigateToChat(chatId);
        }
    };

    const handlePremiumUpgrade = () => {
        // Handle premium upgrade logic
        console.log("Premium upgrade pressed");
    };

    const handleClearHistory = () => {
        // Handle clear history logic
        console.log("Clear history pressed");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to AllyAI</Text>
                <Text style={styles.subtitle}>Your AI Assistant</Text>

                <PremiumUpgrade onPress={handlePremiumUpgrade} />

                <NewChatButton onPress={handleNewChat} />

                <ChatHistoryList
                    onChatPress={handleChatPress}
                    onClearHistory={handleClearHistory}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100, // Space for navigation bar
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.text.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: colors.text.secondary,
        marginBottom: 30,
    },
});

export default HomeScreen;
