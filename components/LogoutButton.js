import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const LogoutButton = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={colors.status.warning}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {t("accountManagement.logout.title")}
                </Text>
                <Text style={styles.subtitle}>
                    {t("accountManagement.logout.subtitle")}
                </Text>
            </View>
            <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text.muted}
            />
        </TouchableOpacity>
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
            marginBottom: 12,
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
    });

export default LogoutButton;
