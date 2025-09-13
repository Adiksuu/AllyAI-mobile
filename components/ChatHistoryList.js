import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const ChatHistoryList = ({ onChatPress, onClearHistory }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    // Mock data - replace with real data from your state/API
    const chatHistory = [
        {
            id: "1",
            title: t("chatHistory.recentChats.1.title"),
            lastMessage: t("chatHistory.recentChats.1.lastMessage"),
            timestamp: t("chatHistory.recentChats.1.timestamp"),
            messageCount: 5,
        },
        {
            id: "2",
            title: t("chatHistory.recentChats.2.title"),
            lastMessage: t("chatHistory.recentChats.2.lastMessage"),
            timestamp: t("chatHistory.recentChats.2.timestamp"),
            messageCount: 12,
        },
        {
            id: "3",
            title: t("chatHistory.recentChats.3.title"),
            lastMessage: t("chatHistory.recentChats.3.lastMessage"),
            timestamp: t("chatHistory.recentChats.3.timestamp"),
            messageCount: 8,
        },
        {
            id: "4",
            title: t("chatHistory.recentChats.4.title"),
            lastMessage: t("chatHistory.recentChats.4.lastMessage"),
            timestamp: t("chatHistory.recentChats.4.timestamp"),
            messageCount: 15,
        },
    ];

    const formatTime = (timestamp) => {
        return timestamp;
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("home.recentChats")}</Text>
                {chatHistory.length > 0 && (
                    <TouchableOpacity
                        onPress={onClearHistory}
                        style={styles.clearButton}
                    >
                        <Text style={styles.clearText}>
                            {t("chatHistory.clearAll")}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {chatHistory.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons
                        name="chatbubbles-outline"
                        size={48}
                        color={colors.text.muted}
                    />
                    <Text style={styles.emptyTitle}>
                        {t("chatHistory.emptyTitle")}
                    </Text>
                    <Text style={styles.emptySubtitle}>
                        {t("chatHistory.emptySubtitle")}
                    </Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                >
                    {chatHistory.map((chat) => (
                        <TouchableOpacity
                            key={chat.id}
                            style={styles.chatItem}
                            onPress={() => onChatPress(chat.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.chatIcon}>
                                <Ionicons
                                    name="chatbubble"
                                    size={20}
                                    color={colors.accent.lightBlue}
                                />
                            </View>
                            <View style={styles.chatContent}>
                                <Text
                                    style={styles.chatTitle}
                                    numberOfLines={1}
                                >
                                    {chat.title}
                                </Text>
                                <Text
                                    style={styles.chatLastMessage}
                                    numberOfLines={1}
                                >
                                    {chat.lastMessage}
                                </Text>
                                <View style={styles.chatMeta}>
                                    <Text style={styles.chatTimestamp}>
                                        {formatTime(chat.timestamp)}
                                    </Text>
                                    <View style={styles.messageCount}>
                                        <Text style={styles.messageCountText}>
                                            {chat.messageCount}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={16}
                                color={colors.text.muted}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.background.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 20,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.secondary,
        },
        title: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text.primary,
        },
        clearButton: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: colors.background.secondary,
            borderRadius: 8,
        },
        clearText: {
            fontSize: 12,
            color: colors.text.muted,
            fontWeight: "500",
        },
        list: {
            maxHeight: 300,
        },
        chatItem: {
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.secondary,
        },
        chatIcon: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
        },
        chatContent: {
            flex: 1,
        },
        chatTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 4,
        },
        chatLastMessage: {
            fontSize: 14,
            color: colors.text.secondary,
            marginBottom: 6,
        },
        chatMeta: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        chatTimestamp: {
            fontSize: 12,
            color: colors.text.muted,
        },
        messageCount: {
            backgroundColor: colors.accent.lightBlue,
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 2,
            minWidth: 20,
            alignItems: "center",
        },
        messageCountText: {
            fontSize: 10,
            color: colors.background.primary,
            fontWeight: "600",
        },
        emptyState: {
            alignItems: "center",
            padding: 40,
        },
        emptyTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text.primary,
            marginTop: 16,
            marginBottom: 8,
        },
        emptySubtitle: {
            fontSize: 14,
            color: colors.text.secondary,
            textAlign: "center",
        },
    });

export default ChatHistoryList;
