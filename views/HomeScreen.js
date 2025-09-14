import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { NewChatButton, PremiumUpgrade, ChatHistoryList } from "../components";
import PremiumModal from "../components/PremiumModal";
import ClearChatHistoryModal from "../components/ClearChatHistoryModal";
import ModelSelectionModal from "../components/ModelSelectionModal";
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
