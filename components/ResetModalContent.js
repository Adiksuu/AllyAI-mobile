import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const ResetModalContent = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="refresh-outline"
                    size={48}
                    color={colors.status.warning}
                />
            </View>

            <Text style={styles.title}>{t("resetSettings.alertTitle")}</Text>

            <Text style={styles.message}>
                {t("resetSettings.alertMessage")}
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
                        name="refresh-outline"
                        size={20}
                        color={colors.primary.black}
                    />
                    <Text style={styles.confirmButtonText}>
                        {t("resetSettings.resetButton")}
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
        cancelButton: {
            width: 140,
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
            width: 140,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: colors.status.warning,
            gap: 8,
        },
        confirmButtonText: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
    });

export default ResetModalContent;