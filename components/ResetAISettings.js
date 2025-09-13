import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import { useTranslation } from "../contexts/TranslationContext";

const ResetAISettings = () => {
    const { t } = useTranslation();
    const [isResetting, setIsResetting] = useState(false);

    const handleResetSettings = () => {
        Alert.alert(
            t("resetSettings.alertTitle"),
            t("resetSettings.alertMessage"),
            [
                {
                    text: t("common.cancel"),
                    style: "cancel",
                },
                {
                    text: t("resetSettings.resetButton"),
                    style: "destructive",
                    onPress: () => {
                        setIsResetting(true);
                        // TODO: Implement reset functionality
                        setTimeout(() => {
                            setIsResetting(false);
                            console.log("AI settings reset to defaults");
                        }, 2000);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="refresh-outline"
                        size={24}
                        color={colors.status.warning}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {t("aiChatbotSettings.resetSettings.title")}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t("aiChatbotSettings.resetSettings.subtitle")}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.resetButton,
                    isResetting && styles.resetButtonDisabled,
                ]}
                onPress={handleResetSettings}
                disabled={isResetting}
            >
                <Ionicons
                    name={isResetting ? "hourglass-outline" : "refresh-outline"}
                    size={20}
                    color={
                        isResetting ? colors.text.muted : colors.status.warning
                    }
                />
                <Text
                    style={[
                        styles.resetButtonText,
                        isResetting && styles.resetButtonTextDisabled,
                    ]}
                >
                    {isResetting ? t("resetSettings.resetingButton") : t("resetSettings.resetButton")}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        marginBottom: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: colors.text.secondary,
    },
    resetButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.status.warning,
        backgroundColor: colors.background.secondary,
    },
    resetButtonDisabled: {
        opacity: 0.6,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.status.warning,
        marginLeft: 8,
    },
    resetButtonTextDisabled: {
        color: colors.text.muted,
    },
});

export default ResetAISettings;
