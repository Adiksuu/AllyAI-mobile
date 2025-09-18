import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const NoInternetScreen = ({ onRetry }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="wifi-off"
                        size={80}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <Text style={styles.title}>{t("noInternet.title")}</Text>
                <Text style={styles.message}>{t("noInternet.message")}</Text>
                {onRetry && (
                    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                        <Text style={styles.retryButtonText}>{t("noInternet.retry")}</Text>
                    </TouchableOpacity>
                )}
            </View>
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
            paddingTop: 100,
            paddingBottom: 100, // Space for navigation bar
            alignItems: "center",
            justifyContent: "center",
        },
        iconContainer: {
            marginBottom: 30,
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: 16,
            textAlign: "center",
        },
        message: {
            fontSize: 16,
            color: colors.text.secondary,
            textAlign: "center",
            marginBottom: 40,
            lineHeight: 24,
        },
        retryButton: {
            backgroundColor: colors.accent.lightBlue,
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 8,
        },
        retryButtonText: {
            color: colors.text.primary,
            fontSize: 16,
            fontWeight: "600",
        },
    });

export default NoInternetScreen;