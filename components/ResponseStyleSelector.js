import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const ResponseStyleSelector = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [selectedStyle, setSelectedStyle] = useState("balanced");

    const responseStyles = [
        {
            id: "concise",
            name: t("responseStyle.concise.name"),
            description: t("responseStyle.concise.description"),
            icon: "arrow-up-outline",
        },
        {
            id: "balanced",
            name: t("responseStyle.balanced.name"),
            description: t("responseStyle.balanced.description"),
            icon: "remove-outline",
        },
        {
            id: "detailed",
            name: t("responseStyle.detailed.name"),
            description: t("responseStyle.detailed.description"),
            icon: "arrow-down-outline",
        },
    ];

    const handleStyleSelect = (styleId) => {
        setSelectedStyle(styleId);
        // TODO: Save to user preferences
        console.log("Selected response style:", styleId);
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{t("responseStyle.title")}</Text>
                    <Text style={styles.subtitle}>
                        {t("responseStyle.subtitle")}{" "}
                    </Text>
                </View>
            </View>

            <View style={styles.optionsContainer}>
                {responseStyles.map((style) => (
                    <TouchableOpacity
                        key={style.id}
                        style={[
                            styles.option,
                            selectedStyle === style.id && styles.selectedOption,
                        ]}
                        onPress={() => handleStyleSelect(style.id)}
                    >
                        <View style={styles.optionContent}>
                            <View style={styles.optionIcon}>
                                <Ionicons
                                    name={style.icon}
                                    size={20}
                                    color={
                                        selectedStyle === style.id
                                            ? colors.accent.lightBlue
                                            : colors.text.primary
                                    }
                                />
                            </View>
                            <View style={styles.optionText}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        selectedStyle === style.id &&
                                            styles.selectedOptionTitle,
                                    ]}
                                >
                                    {style.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.optionDescription,
                                        selectedStyle === style.id &&
                                            styles.selectedOptionDescription,
                                    ]}
                                >
                                    {style.description}
                                </Text>
                            </View>
                        </View>
                        {selectedStyle === style.id && (
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

export default ResponseStyleSelector;
