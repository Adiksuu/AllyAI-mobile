import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import Constants from "expo-constants";
import { NotificationsModal } from "../components";

const SettingsScreen = ({ navigation }) => {
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);

    const handleNotificationsPress = () => {
        setShowNotificationsModal(true);
    };

    const handleCloseModal = () => {
        setShowNotificationsModal(false);
    };

    const handleEnableNotifications = () => {
        // TODO: Implement notification enabling logic
        console.log("Notifications enabled");
    };

    const settingsItems = [
        {
            icon: "person-outline",
            title: "Account",
            subtitle: "Manage your account",
        },
        {
            icon: "chatbox-outline",
            title: "AI Chatbot",
            subtitle: "Configure your AI settings",
        },
        {
            icon: "notifications-outline",
            title: "Notifications",
            subtitle: "Configure alerts",
        },
        {
            icon: "language-outline",
            title: "Language",
            subtitle: "App language",
        },
        {
            icon: "moon-outline",
            title: "Theme",
            subtitle: "Dark mode settings",
        },
        {
            icon: "help-circle-outline",
            title: "Help & Support",
            subtitle: "Get help",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Customize your experience</Text>

                <View style={styles.settingsList}>
                    {settingsItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.settingItem}
                            onPress={() => {
                                if (item.title === "Account") {
                                    navigation.navigate("AccountManagement");
                                } else if (item.title === "AI Chatbot") {
                                    navigation.navigate("AIChatbotSettings");
                                } else if (item.title === "Notifications") {
                                    handleNotificationsPress();
                                }
                            }}
                        >
                            <View style={styles.settingIcon}>
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color={colors.accent.lightBlue}
                                />
                            </View>
                            <View style={styles.settingContent}>
                                <Text style={styles.settingTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.settingSubtitle}>
                                    {item.subtitle}
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.text.muted}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>About AllyAI</Text>
                    <Text style={styles.infoText}>
                        Version {Constants.expoConfig?.version}
                    </Text>
                    <Text style={styles.infoText}>
                        Updated on {Constants.expoConfig?.extra?.updateDate}
                    </Text>
                </View>
            </View>

            <NotificationsModal
                visible={showNotificationsModal}
                onClose={handleCloseModal}
                onEnable={handleEnableNotifications}
            />
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
    settingsList: {
        backgroundColor: colors.background.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.secondary,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
    },
    infoCard: {
        backgroundColor: colors.background.card,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.accent.lightBlue,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 4,
    },
});

export default SettingsScreen;
