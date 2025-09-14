import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const EmailDisplay = ({ userEmail }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="mail-outline"
                    size={24}
                    color={colors.accent.lightBlue}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>
                    {t("accountManagement.email.title")}
                </Text>
                <Text style={styles.email}>{userEmail}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Ionicons
                    name="pencil-outline"
                    size={20}
                    color={colors.accent.lightBlue}
                />
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background.card,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
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
        label: {
            fontSize: 14,
            color: colors.text.secondary,
            marginBottom: 4,
        },
        email: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.primary,
        },
        editButton: {
            padding: 8,
            borderRadius: 8,
            backgroundColor: colors.background.secondary,
        },
    });

export default EmailDisplay;
