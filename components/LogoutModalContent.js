import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const LogoutModalContent = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="log-out-outline"
                    size={48}
                    color={colors.status.warning}
                />
            </View>

            <Text style={styles.title}>{t("accountManagement.logout.title")}</Text>

            <Text style={styles.message}>
                Are you sure you want to sign out of your account?
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>
                        {t("common.cancel")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={onConfirm}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={colors.primary.black}
                    />
                    <Text style={styles.confirmButtonText}>
                        {t("accountManagement.logout.title")}
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
            marginBottom: 32,
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
            backgroundColor: colors.status.warning,
            gap: 8,
        },
        confirmButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
    });

export default LogoutModalContent;