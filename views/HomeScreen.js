import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { NewChatButton, PremiumUpgrade, ChatHistoryList, UpdateModal } from "../components";
import PremiumModal from "../components/PremiumModal";
import ClearChatHistoryModal from "../components/ClearChatHistoryModal";
import ModelSelectionModal from "../components/ModelSelectionModal";
import Constants from "expo-constants";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { removeChatHistory } from "../functions/chat";
import { getCurrentUser } from "../functions/auth";

const HomeScreen = ({ onNavigateToChat }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [showPremiumModal, setShowPremiumModal] = React.useState(false);
    const [showClearHistoryModal, setShowClearHistoryModal] = React.useState(false);
    const [showModelSelectionModal, setShowModelSelectionModal] = React.useState(false);
    const [showUpdateModal, setShowUpdateModal] = React.useState(false);
    const [updateData, setUpdateData] = React.useState(null);
    const [selectedModel, setSelectedModel] = React.useState("ALLY-3");
    const [refreshKey, setRefreshKey] = React.useState(0);

    const handleNewChat = () => {
        setShowModelSelectionModal(true);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        if (onNavigateToChat) {
            onNavigateToChat(null, model); // Pass null for chatId and the selected model
        }
    };

    const handleChatPress = (chatId) => {
        if (onNavigateToChat) {
            onNavigateToChat(chatId);
        }
    };

    const handlePremiumUpgrade = () => {
        setShowPremiumModal(true);
    };

    const handleClearHistory = () => {
        setShowClearHistoryModal(true);
    };

    const handleConfirmClearHistory = async () => {
        try {
            const user = getCurrentUser();
            if (user) {
                await removeChatHistory(user.uid);
                // Trigger refresh of chat history list
                setRefreshKey((prev) => prev + 1);
                console.log(
                    "Chat history cleared successfully"
                );
            }
        } catch (error) {
            console.error(
                "Error clearing chat history:",
                error
            );
            Alert.alert(
                "Error",
                "Failed to clear chat history. Please try again."
            );
        }
    };

    const checkForUpdates = async () => {
        try {
            const currentVersion = Constants.expoConfig?.version;
            // For development, use your machine's IP address instead of localhost
            // Replace with your actual development server IP
            const response = await fetch(`https://allyai-backend.onrender.com/api/release/Adiksuu/AllyAI-mobile?current=${currentVersion}`);
            const data = await response.json();

            if (data.success && data.updateAvailable) {
                setUpdateData(data);
                setShowUpdateModal(true);
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
            // For testing purposes, you can uncomment the mock data below
            /*
            const mockData = {
                success: true,
                repository: "Adiksuu/AllyAI-mobile",
                release: {
                    version: "v1.1.0",
                    name: "AllyAI v1.1.0",
                    description: "New features and improvements for better user experience.",
                    publishedAt: "2025-09-20T14:12:03Z",
                    downloadUrl: "https://github.com/Adiksuu/AllyAI-mobile/releases/tag/v1.1.0",
                    zipUrl: "https://api.github.com/repos/Adiksuu/AllyAI-mobile/zipball/v1.1.0",
                    tarUrl: "https://api.github.com/repos/Adiksuu/AllyAI-mobile/tarball/v1.1.0",
                    author: "Adiksuu",
                    isPrerelease: false,
                    isDraft: false,
                    isNewer: true,
                    currentVersion: "v1.0.0"
                },
                updateAvailable: true,
                comparedVersion: "v1.0.0"
            };
            setUpdateData(mockData);
            setShowUpdateModal(true);
            */
        }
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    // Check for updates on screen load
    React.useEffect(() => {
        checkForUpdates();
    }, []);

    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{t("home.title")}</Text>
                <Text style={styles.subtitle}>{t("home.subtitle")}</Text>

                <PremiumUpgrade onPress={handlePremiumUpgrade} />
                <NewChatButton onPress={handleNewChat} />
                <ChatHistoryList
                    key={refreshKey}
                    onChatPress={handleChatPress}
                    onClearHistory={handleClearHistory}
                />
            </View>
            <PremiumModal
                visible={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
            />
            <ClearChatHistoryModal
                visible={showClearHistoryModal}
                onClose={() => setShowClearHistoryModal(false)}
                onConfirm={handleConfirmClearHistory}
            />
            <ModelSelectionModal
                visible={showModelSelectionModal}
                onClose={() => setShowModelSelectionModal(false)}
                onModelSelect={handleModelSelect}
                currentModel={selectedModel}
            />
            <UpdateModal
                visible={showUpdateModal}
                onClose={handleCloseUpdateModal}
                updateData={updateData}
            />
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
