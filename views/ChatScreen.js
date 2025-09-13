import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../api/theme/colors";

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>AI Chat</Text>
                <Text style={styles.subtitle}>Start a conversation</Text>
            </View>

            <ScrollView style={styles.chatContainer}>
                <View style={styles.message}>
                    <Text style={styles.messageText}>
                        Hello! I'm AllyAI, your personal assistant. How can I
                        help you today?
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.inputArea}>
                <Text style={styles.placeholder}>
                    Type your message here...
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
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
    },
    chatContainer: {
        flex: 1,
        padding: 20,
    },
    message: {
        backgroundColor: colors.background.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        marginBottom: 16,
    },
    messageText: {
        fontSize: 16,
        color: colors.text.primary,
        lineHeight: 24,
    },
    inputArea: {
        padding: 20,
        paddingBottom: 100, // Space for navigation bar
        borderTopWidth: 1,
        borderTopColor: colors.border.primary,
    },
    placeholder: {
        fontSize: 16,
        color: colors.text.muted,
        textAlign: "center",
        paddingVertical: 16,
        backgroundColor: colors.background.secondary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.primary,
    },
});

export default ChatScreen;
