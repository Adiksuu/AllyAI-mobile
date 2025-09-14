import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from 'react-native-markdown-display';
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { getChatMessages } from "../functions/chat";
import { getCurrentUser } from "../functions/auth";

const ChatScreen = ({ chatId }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const loadMessages = async () => {
            console.log(chatId)
            if (!chatId) {
                setMessages([]);
                return;
            }

            const user = getCurrentUser();
            if (!user) {
                setError("User not authenticated");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const chatMessages = await getChatMessages(user.uid, chatId);
                setMessages(chatMessages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [chatId]);

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("navigation.chat")}</Text>
                <Text style={styles.subtitle}>{t("chat.subtitle")}</Text>
            </View>

            <ScrollView style={styles.chatContainer}>
                {loading ? (
                    <View style={styles.centerMessage}>
                        <Text style={styles.centerText}>Loading messages...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerMessage}>
                        <Text style={styles.centerText}>Error: {error}</Text>
                    </View>
                ) : messages.length === 0 ? (
                    <View style={styles.centerMessage}>
                        <Text style={styles.centerText}>
                            {chatId ? "No messages in this chat." : t("chat.welcomeMessage")}
                        </Text>
                    </View>
                ) : (
                    messages.map((msg) => (
                        <View key={msg.id} style={[
                            styles.messageContainer,
                            msg.author === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
                        ]}>
                            {msg.author === 'user' ? (
                                <Text style={styles.userMessageText}>
                                    {msg.message}
                                </Text>
                            ) : (
                                <View style={styles.aiMessage}>
                                    <Markdown style={markdownStyles(colors)}>
                                        {msg.message}
                                    </Markdown>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.inputArea}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.uploadButton}>
                        <Ionicons name="attach" size={24} color={colors.text.muted} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder={t("chat.placeholder")}
                        placeholderTextColor={colors.text.muted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={1000}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Ionicons name="send" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
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
        messageContainer: {
            marginBottom: 16,
        },
        userMessageContainer: {
            alignItems: 'flex-end',
        },
        aiMessageContainer: {
            alignItems: 'flex-start',
        },
        userMessageText: {
            fontSize: 16,
            color: colors.text.primary,
            lineHeight: 24,
            textAlign: 'right',
        },
        aiMessage: {
            backgroundColor: colors.background.card,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            width: '100%',
        },
        inputArea: {
            padding: 20,
            paddingBottom: 100, // Space for navigation bar
            borderTopWidth: 1,
            borderTopColor: colors.border.primary,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background.secondary,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: colors.border.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        uploadButton: {
            marginRight: 8,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInput: {
            flex: 1,
            fontSize: 16,
            color: colors.text.primary,
            maxHeight: 100,
            minHeight: 40,
            paddingVertical: 8,
            textAlignVertical: 'center',
        },
        sendButton: {
            marginLeft: 8,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
        },
        centerMessage: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        centerText: {
            fontSize: 16,
            color: colors.text.secondary,
            textAlign: "center",
        },
    });

const markdownStyles = (colors) => ({
    body: {
        color: colors.text.primary,
        fontSize: 16,
        lineHeight: 24,
    },
    paragraph: {
        marginTop: 0,
        marginBottom: 12,
    },
    heading1: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginTop: 16,
        marginBottom: 8,
    },
    heading2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginTop: 14,
        marginBottom: 8,
    },
    heading3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginTop: 12,
        marginBottom: 8,
    },
    code_block: {
        backgroundColor: colors.background.secondary,
        padding: 12,
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 14,
        marginVertical: 8,
    },
    fence: {
        backgroundColor: colors.background.secondary,
        padding: 12,
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 14,
        marginVertical: 8,
    },
    code_inline: {
        backgroundColor: colors.background.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    blockquote: {
        borderLeftWidth: 3,
        borderLeftColor: colors.accent.lightBlue,
        paddingLeft: 12,
        marginLeft: 0,
        marginVertical: 8,
        fontStyle: 'italic',
    },
    list_item: {
        marginBottom: 4,
    },
    bullet_list: {
        marginBottom: 12,
    },
    ordered_list: {
        marginBottom: 12,
    },
    strong: {
        fontWeight: 'bold',
    },
    em: {
        fontStyle: 'italic',
    },
    link: {
        color: colors.accent.lightBlue,
        textDecorationLine: 'underline',
    },
});

export default ChatScreen;
