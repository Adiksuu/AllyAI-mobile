import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const AIPersonalitySelector = ({ selectedPersonality, onPersonalityChange, disabled = false }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const personalities = [
        {
            id: "Friendly",
            name: t("aiPersonality.friendly.name"),
            description: t("aiPersonality.friendly.description"),
            icon: "happy-outline",
        },
        {
            id: "Professional",
            name: t("aiPersonality.professional.name"),
            description: t("aiPersonality.professional.description"),
            icon: "briefcase-outline",
        },
        {
            id: "Creative",
            name: t("aiPersonality.creative.name"),
            description: t("aiPersonality.creative.description"),
            icon: "color-palette-outline",
        },
        {
            id: "Analytical",
            name: t("aiPersonality.analytical.name"),
            description: t("aiPersonality.analytical.description"),
            icon: "analytics-outline",
        },
    ];

    const handlePersonalitySelect = (personalityId) => {
        if (!disabled && onPersonalityChange) {
            onPersonalityChange(personalityId);
        }
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="person-outline"
                        size={24}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{t("aiPersonality.title")}</Text>
                    <Text style={styles.subtitle}>
                        {t("aiPersonality.subtitle")}
                    </Text>
                </View>
            </View>

            <View style={styles.optionsContainer}>
                {personalities.map((personality) => (
                    <TouchableOpacity
                        key={personality.id}
                        style={[
                            styles.option,
                            selectedPersonality === personality.id &&
                                styles.selectedOption,
                            disabled && styles.disabledOption,
                        ]}
                        onPress={() => handlePersonalitySelect(personality.id)}
                        disabled={disabled}
                    >
                        <View style={styles.optionContent}>
                            <View style={styles.optionIcon}>
                                <Ionicons
                                    name={personality.icon}
                                    size={20}
                                    color={
                                        selectedPersonality === personality.id
                                            ? colors.accent.lightBlue
                                            : colors.text.primary
                                    }
                                />
                            </View>
                            <View style={styles.optionText}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        selectedPersonality ===
                                            personality.id &&
                                            styles.selectedOptionTitle,
                                    ]}
                                >
                                    {personality.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.optionDescription,
                                        selectedPersonality ===
                                            personality.id &&
                                            styles.selectedOptionDescription,
                                    ]}
                                >
                                    {personality.description}
                                </Text>
                            </View>
                        </View>
                        {selectedPersonality === personality.id && (
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.accent.lightBlue}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
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
        optionsContainer: {
            marginTop: 8,
        },
        option: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border.secondary,
            marginBottom: 8,
            backgroundColor: colors.background.secondary,
        },
        selectedOption: {
            backgroundColor: colors.accent.lightBlue,
            borderColor: colors.accent.lightBlue,
        },
        disabledOption: {
            opacity: 0.6,
        },
        optionContent: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        optionIcon: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.background.primary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
        },
        optionText: {
            flex: 1,
        },
        optionTitle: {
            fontSize: 14,
            fontWeight: "500",
            color: colors.text.primary,
            marginBottom: 2,
        },
        selectedOptionTitle: {
            color: colors.primary.black,
            fontWeight: "600",
        },
        optionDescription: {
            fontSize: 12,
            color: colors.text.secondary,
        },
        selectedOptionDescription: {
            color: colors.primary.black,
            opacity: 0.8,
        },
    });

export default AIPersonalitySelector;
