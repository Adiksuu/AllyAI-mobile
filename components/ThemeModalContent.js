import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const ThemeModalContent = ({ onThemeSelect, onCancel, currentTheme }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const themes = [
        {
            code: "light",
            name: t("themeModal.themes.light"),
            icon: "sunny-outline",
            description: t("themeModal.descriptions.light"),
        },
        {
            code: "dark",
            name: t("themeModal.themes.dark"),
            icon: "moon-outline",
            description: t("themeModal.descriptions.dark"),
        },
        {
            code: "auto",
            name: t("themeModal.themes.auto"),
            icon: "phone-portrait-outline",
            description: t("themeModal.descriptions.auto"),
        },
    ];

    const handleThemePress = (theme) => {
        onThemeSelect(theme);
    };

    return (
        <View style={styles.content}>
            <Text style={styles.introducingLabel}>
                {t("themeModal.selectTheme")}
            </Text>
            <Text style={styles.title}>{t("themeModal.title")}</Text>

            <ScrollView
                style={styles.themesList}
                showsVerticalScrollIndicator={false}
            >
                {themes.map((theme, index) => (
                    <TouchableOpacity
                        key={theme.code}
                        style={[
                            styles.themeItem,
                            currentTheme === theme.code &&
                                styles.selectedThemeItem,
                        ]}
                        onPress={() => handleThemePress(theme)}
                    >
                        <View style={styles.themeInfo}>
                            <View style={styles.themeIconContainer}>
                                <Ionicons
                                    name={theme.icon}
                                    size={24}
                                    color={
                                        currentTheme === theme.code
                                            ? colors.accent.lightBlue
                                            : colors.text.primary
                                    }
                                />
                            </View>
                            <View style={styles.themeTextContainer}>
                                <Text
                                    style={[
                                        styles.themeName,
                                        currentTheme === theme.code &&
                                            styles.selectedThemeName,
                                    ]}
                                >
                                    {theme.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.themeDescription,
                                        currentTheme === theme.code &&
                                            styles.selectedThemeDescription,
                                    ]}
                                >
                                    {theme.description}
                                </Text>
                            </View>
                        </View>
                        {currentTheme === theme.code && (
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color={colors.accent.lightBlue}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>
                        {t("common.cancel")}
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
            maxHeight: 500,
        },
        introducingLabel: {
            fontSize: 14,
            fontWeight: "600",
            color: colors.text.secondary,
            textAlign: "center",
            letterSpacing: 1,
            marginBottom: 8,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text.primary,
            textAlign: "center",
            marginBottom: 24,
        },
        themesList: {
            marginBottom: 24,
            maxHeight: 300,
        },
        themeItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginBottom: 8,
            borderRadius: 12,
            backgroundColor: colors.background.secondary,
            borderWidth: 1,
            borderColor: "transparent",
        },
        selectedThemeItem: {
            backgroundColor: colors.background.card,
            borderColor: colors.accent.lightBlue,
        },
        themeInfo: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        themeIconContainer: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background.primary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },
        themeTextContainer: {
            flex: 1,
        },
        themeName: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.primary,
            marginBottom: 2,
        },
        selectedThemeName: {
            color: colors.accent.lightBlue,
            fontWeight: "600",
        },
        themeDescription: {
            fontSize: 14,
            color: colors.text.secondary,
        },
        selectedThemeDescription: {
            color: colors.text.secondary,
        },
        buttonsContainer: {
            gap: 12,
        },
        cancelButton: {
            alignItems: "center",
            paddingVertical: 12,
        },
        cancelButtonText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.secondary,
        },
    });

export default ThemeModalContent;
