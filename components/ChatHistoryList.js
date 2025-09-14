import React, { useState, useEffect } from "react";
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
import { getChatHistory } from "../functions/chat";
import { getCurrentUser, onAuthStateChanged } from "../functions/auth";

const ChatHistoryList = ({ onChatPress, onClearHistory }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => {
            if (!user) {
                setChatHistory([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const chats = await getChatHistory(user.uid, t);
                console.log("ChatHistoryList received chats:", chats.length);
                // console.log("ChatHistoryList chats data:", chats);
                setChatHistory(chats);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, [t]);

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return t("chatHistory.time.justNow");
        if (minutes < 60) return `${minutes}${t("chatHistory.time.minutesSuffix")}`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}${t("chatHistory.time.hoursSuffix")}`;
        const days = Math.floor(hours / 24);
        return `${days}${t("chatHistory.time.daysSuffix")}`;
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("home.recentChats")}</Text>
                {chatHistory.length > 0 && !loading && (
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

            {loading ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Loading chats...</Text>
                </View>
            ) : error ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Error loading chats</Text>
                    <Text style={styles.emptySubtitle}>{error}</Text>
                </View>
            ) : chatHistory.length === 0 ? (
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
                    {(showAll ? chatHistory : chatHistory.slice(0, 3)).map(
                        (chat) => (
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
                                            <Text
                                                style={styles.messageCountText}
                                            >
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
                        )
                    )}
                    {chatHistory.length > 3 && !showAll && (
                        <TouchableOpacity
                            style={styles.showAllButton}
                            onPress={() => setShowAll(true)}
                        >
                            <Text style={styles.showAllText}>
                                {t("chatHistory.showAllChats")}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {chatHistory.length > 3 && showAll && (
                        <TouchableOpacity
                            style={styles.showAllButton}
                            onPress={() => setShowAll(false)}
                        >
                            <Text style={styles.showAllText}>
                                {t("chatHistory.showLess")}
                            </Text>
                        </TouchableOpacity>
                    )}
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
            // Remove height constraint to show all chats
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
        showAllButton: {
            alignSelf: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.accent.lightBlue,
            borderRadius: 8,
            marginTop: 16,
            marginBottom: 16,
        },
        showAllText: {
            fontSize: 14,
            color: colors.background.primary,
            fontWeight: "600",
        },
    });

export default ChatHistoryList;
