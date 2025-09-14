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
import {
    AIPersonalitySelector,
    ResponseStyleSelector,
    ConversationLengthSelector,
    AICapabilitiesToggle,
    ResetAISettings,
} from "../components";
import { getCurrentUser, getUserSettings, updateUserSettings, resetUserSettings } from "../functions/auth";

const AIChatbotSettingsScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [settings, setSettings] = useState({
        personality: "Friendly",
        responseStyle: "Balanced",
        length: "Medium",
        tools: ['Web Search', 'Image Generation', 'Memory & Context', 'File Analysis']
    });
    const [isLoading, setIsLoading] = useState(true);

    // Load user settings on component mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const currentUser = getCurrentUser();
                if (currentUser) {
                    const userSettings = await getUserSettings(currentUser.uid);
                    setSettings(userSettings);
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

    // Update individual setting
    const updateSetting = async (key, value) => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser) {
                const updatedSettings = { ...settings, [key]: value };
                setSettings(updatedSettings);
                await updateUserSettings(currentUser.uid, { [key]: value });
            }
        } catch (error) {
            console.error('Error updating setting:', error);
        }
    };

    // Reset settings to default
    const handleResetSettings = async () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser) {
                const defaultSettings = await resetUserSettings(currentUser.uid);
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    };

    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text.primary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {t("aiChatbotSettings.title")}
                    </Text>
                </View>

                <Text style={styles.subtitle}>
                    {t("aiChatbotSettings.subtitle")}
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("aiChatbotSettings.personality.title")}
                    </Text>
                    <AIPersonalitySelector
                        selectedPersonality={settings.personality}
                        onPersonalityChange={(value) => updateSetting('personality', value)}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("aiChatbotSettings.responseStyle.title")}
                    </Text>
                    <ResponseStyleSelector
                        selectedStyle={settings.responseStyle}
                        onStyleChange={(value) => updateSetting('responseStyle', value)}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("aiChatbotSettings.conversationLength.title")}
                    </Text>
                    <ConversationLengthSelector
                        selectedLength={settings.length}
                        onLengthChange={(value) => updateSetting('length', value)}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("aiChatbotSettings.capabilities.title")}
                    </Text>
                    <AICapabilitiesToggle
                        selectedTools={settings.tools}
                        onToolsChange={(value) => updateSetting('tools', value)}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("aiChatbotSettings.resetSettings.title")}
                    </Text>
                    <ResetAISettings
                        onReset={handleResetSettings}
                        disabled={isLoading}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
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
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        backButton: {
            marginRight: 16,
            padding: 8,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text.primary,
        },
        subtitle: {
            fontSize: 18,
            color: colors.text.secondary,
            marginBottom: 30,
        },
        section: {
            marginBottom: 30,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 16,
        },
    });

export default AIChatbotSettingsScreen;
