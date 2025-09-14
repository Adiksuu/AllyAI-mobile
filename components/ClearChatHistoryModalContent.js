import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const ClearChatHistoryModalContent = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="trash-outline"
                    size={48}
                    color={colors.status.error}
                />
            </View>

            <Text style={styles.title}>{t("modals.clearChatHistory.title") || "Clear Chat History"}</Text>

            <Text style={styles.message}>
                {t("modals.clearChatHistory.message") || "Are you sure you want to delete all your chat history? This action cannot be undone."}
            </Text>

            <View style={styles.warningContainer}>
                <Ionicons
                    name="warning-outline"
                    size={20}
                    color={colors.status.error}
                />
                <Text style={styles.warningText}>
                    {t("modals.clearChatHistory.warning") || "All your conversations will be permanently deleted."}
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>
                        {t("common.cancel") || "Cancel"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={onConfirm}
                >
                    <Ionicons
                        name="trash-outline"
                        size={20}
                        color={colors.primary.white}
                    />
                    <Text style={styles.confirmButtonText}>
                        {t("modals.clearChatHistory.confirmButton") || "Clear All"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        content: {
            paddingHorizontal: 24,
            paddingBottom: 24,
            alignItems: "center",
        },
        iconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text.primary,
            textAlign: "center",
            marginBottom: 12,
        },
        message: {
            fontSize: 16,
            color: colors.text.secondary,
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 20,
        },
        warningContainer: {
            flexDirection: "row",
            alignItems: "flex-start",
            backgroundColor: colors.status.error + "20", // 20% opacity
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.status.error + "40", // 40% opacity
            marginBottom: 24,
            gap: 12,
        },
        warningText: {
            fontSize: 14,
            color: colors.status.error,
            flex: 1,
            lineHeight: 20,
        },
        buttonsContainer: {
            flexDirection: "row",
            gap: 12,
            width: "100%",
        },
        cancelButton: {
            flex: 1,
            alignItems: "center",
            paddingVertical: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        cancelButtonText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.secondary,
        },
        confirmButton: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: colors.status.error,
            gap: 8,
        },
        confirmButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.white,
        },
    });

export default ClearChatHistoryModalContent;