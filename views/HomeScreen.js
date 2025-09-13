import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NewChatButton, PremiumUpgrade, ChatHistoryList } from "../components";
import PremiumModal from "../components/PremiumModal";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const HomeScreen = ({ onNavigateToChat }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [showPremiumModal, setShowPremiumModal] = React.useState(false);

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
        setShowPremiumModal(true);
    };

    const handleClearHistory = () => {
        // Handle clear history logic
        console.log("Clear history pressed");
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
                    onChatPress={handleChatPress}
                    onClearHistory={handleClearHistory}
                />
            </View>
            <PremiumModal
                visible={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
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
