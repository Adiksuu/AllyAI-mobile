import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import { useTranslation } from "../contexts/TranslationContext";

const DeleteAccount = () => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="trash-outline"
                    size={24}
                    color={colors.status.error}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {t("accountManagement.deleteAccount.title")}
                </Text>
                <Text style={styles.subtitle}>
                    {t("accountManagement.deleteAccount.subtitle")}
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

const styles = StyleSheet.create({
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
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.status.error,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: colors.text.secondary,
    },
});

export default DeleteAccount;
