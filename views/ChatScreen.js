import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Markdown from 'react-native-markdown-display';
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { getChatMessages, sendMessage, generateAIResponse } from "../functions/chat";
import { getCurrentUser, getUserSettings } from "../functions/auth";
import ModelSelectionModal from "../components/ModelSelectionModal";

const ChatScreen = ({ chatId, selectedModel: initialModel = "ALLY-3" }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputText, setInputText] = useState("");
    const [localChatId, setLocalChatId] = useState(chatId);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [userSettings, setUserSettings] = useState(null);
    const [selectedModel, setSelectedModel] = useState(initialModel);
    const [modelModalVisible, setModelModalVisible] = useState(false);

    useEffect(() => {
        const loadMessages = async () => {
            console.log(localChatId)
            if (!localChatId) {
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
                const chatMessages = await getChatMessages(user.uid, localChatId);
                setMessages(chatMessages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [localChatId]);

    // Load user settings
    useEffect(() => {
        const loadUserSettings = async () => {
            try {
                const user = getCurrentUser();
                if (user) {
                    const settings = await getUserSettings(user.uid);
                    setUserSettings(settings);
                }
            } catch (error) {
                console.error('Error loading user settings:', error);
            }
        };

        loadUserSettings();
    }, []);

    // Request permissions for image picker
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Camera roll permissions are needed to select images.');
            }
        })();
    }, []);

    // Pick image from gallery
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    // Remove selected image
    const removeImage = () => {
        setSelectedImage(null);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const user = getCurrentUser();
        if (!user) {
            setError("User not authenticated");
            return;
        }

        try {
            let currentChatId = localChatId;
            if (!currentChatId) {
                currentChatId = await sendMessage(user.uid, null, inputText, selectedModel, "user", selectedImage);
                setLocalChatId(currentChatId);
            } else {
                await sendMessage(user.uid, currentChatId, inputText, selectedModel, "user", selectedImage);
            }

            // Clear selected image after sending
            setSelectedImage(null);

            // Get updated messages for AI context
            const updatedMessages = await getChatMessages(user.uid, currentChatId);

            setIsGenerating(true);
            try {
                // Generate AI response (pass image URL if available)
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                const imageUrl = lastMessage?.imageUrl || null;
                const aiResponse = await generateAIResponse(user.uid, inputText, updatedMessages, imageUrl, selectedModel);

                if (selectedModel === 'ALLY-IMAGINE') {
                    // For image generation, aiResponse is the image URL
                    await sendMessage(user.uid, currentChatId, "", selectedModel, "AI", aiResponse);
                } else {
                    // For text responses, aiResponse is the text message
                    await sendMessage(user.uid, currentChatId, aiResponse, selectedModel, "AI");
                }
            } finally {
                setIsGenerating(false);
            }

            setInputText("");

            // reload messages
            const finalMessages = await getChatMessages(user.uid, currentChatId);
            setMessages(finalMessages);
        } catch (err) {
            setError(err.message);
        }
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.title}>{t("navigation.chat")}</Text>
                    <TouchableOpacity
                        style={styles.modelSelector}
                        onPress={() => setModelModalVisible(true)}
                    >
                        <Text style={styles.modelText}>{selectedModel}</Text>
                        <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
                    </TouchableOpacity>
                </View>
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
                            {localChatId ? "No messages in this chat." : t("chat.welcomeMessage")}
                        </Text>
                    </View>
                ) : (
                    <View>
                        {messages.map((msg) => (
                            <View key={msg.id} style={[
                                styles.messageContainer,
                                msg.author === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
                            ]}>
                                {msg.author === 'user' ? (
                                    <View>
                                        {msg.imageUrl && (
                                            <Image
                                                source={{ uri: msg.imageUrl }}
                                                style={styles.messageImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                        <Text style={styles.userMessageText}>
                                            {msg.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.aiMessage}>
                                        {msg.imageUrl ? (
                                            <Image
                                                source={{ uri: msg.imageUrl }}
                                                style={styles.generatedImage}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <Markdown style={markdownStyles(colors)}>
                                                {msg.message}
                                            </Markdown>
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                        {isGenerating && (
                            <View style={styles.generatingContainer}>
                                <ActivityIndicator size="small" color={colors.accent.primary} />
                                <Text style={styles.generatingText}>{t("chat.thinking")}</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputArea}>
                {/* Image Preview */}
                {selectedImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
                        <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                            <Ionicons name="close-circle" size={24} color={colors.error} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    {userSettings && userSettings.tools && userSettings.tools.includes('Image Generation') && (
                        <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={isGenerating}>
                            <Ionicons name="image" size={24} color={isGenerating ? colors.text.muted : colors.text.muted} />
                        </TouchableOpacity>
                    )}
                    <TextInput
                        style={styles.textInput}
                        placeholder={t("chat.placeholder")}
                        placeholderTextColor={colors.text.muted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={1000}
                        editable={!isGenerating}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        disabled={isGenerating || !inputText.trim()}
                    >
                        <Ionicons name="send" size={24} color={isGenerating || !inputText.trim() ? colors.text.muted : colors.text.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ModelSelectionModal
                visible={modelModalVisible}
                onClose={() => setModelModalVisible(false)}
                onModelSelect={setSelectedModel}
                currentModel={selectedModel}
            />
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
        headerTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text.primary,
        },
        modelSelector: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background.secondary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        modelText: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.text.primary,
            marginRight: 4,
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
        messageImage: {
            width: 200,
            height: 200,
            borderRadius: 12,
            marginBottom: 8,
            alignSelf: 'flex-end',
        },
        aiMessage: {
            backgroundColor: colors.background.card,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            width: '100%',
        },
        generatedImage: {
            width: '100%',
            height: 300,
            borderRadius: 12,
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
        imagePreviewContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        imagePreview: {
            width: 60,
            height: 60,
            borderRadius: 8,
            marginRight: 10,
        },
        removeImageButton: {
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: colors.background.primary,
            borderRadius: 12,
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
        generatingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            marginBottom: 16,
            backgroundColor: colors.background.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            alignSelf: 'flex-start',
        },
        generatingText: {
            fontSize: 16,
            color: colors.text.secondary,
            marginLeft: 8,
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
