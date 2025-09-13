import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import { useTranslation } from "../contexts/TranslationContext";

const AICapabilitiesToggle = () => {
    const { t } = useTranslation();
    const [capabilities, setCapabilities] = useState({
        webSearch: true,
        imageGeneration: true,
        // codeExecution: true,
        memoryContext: true,
        voiceResponse: false,
        fileAnalysis: true,
    });

    const capabilityItems = [
        {
            id: "webSearch",
            name: t("aiCapabilities.webSearch.name"),
            description: t("aiCapabilities.webSearch.description"),
            icon: "globe-outline",
        },
        {
            id: "imageGeneration",
            name: t("aiCapabilities.imageGeneration.name"),
            description: t("aiCapabilities.imageGeneration.description"),
            icon: "image-outline",
        },
        // {
        //     id: "codeExecution",
        //     name: "Code Execution",
        //     description: "Run and test code snippets",
        //     icon: "code-slash-outline",
        // },
        {
            id: "memoryContext",
            name: t("aiCapabilities.memoryContext.name"),
            description: t("aiCapabilities.memoryContext.description"),
            icon: "brain-outline",
        },
        {
            id: "voiceResponse",
            name: t("aiCapabilities.voiceResponse.name"),
            description: t("aiCapabilities.voiceResponse.description"),
            icon: "volume-high-outline",
        },
        {
            id: "fileAnalysis",
            name: t("aiCapabilities.fileAnalysis.name"),
            description: t("aiCapabilities.fileAnalysis.description"),
            icon: "document-text-outline",
        },
    ];

    const handleToggle = (capabilityId) => {
        setCapabilities((prev) => ({
            ...prev,
            [capabilityId]: !prev[capabilityId],
        }));
        // TODO: Save to user preferences
        console.log(
            "Toggled capability:",
            capabilityId,
            !capabilities[capabilityId]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="settings-outline"
                        size={24}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{t("aiCapabilities.title")}</Text>
                    <Text style={styles.subtitle}>{t("aiCapabilities.subtitle")} </Text>
                </View>
            </View>

            <View style={styles.capabilitiesContainer}>
                {capabilityItems.map((capability) => (
                    <View key={capability.id} style={styles.capabilityItem}>
                        <View style={styles.capabilityContent}>
                            <View style={styles.capabilityIcon}>
                                <Ionicons
                                    name={capability.icon}
                                    size={20}
                                    color={colors.accent.lightBlue}
                                />
                            </View>
                            <View style={styles.capabilityText}>
                                <Text style={styles.capabilityName}>
                                    {capability.name}
                                </Text>
                                <Text style={styles.capabilityDescription}>
                                    {capability.description}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={capabilities[capability.id]}
                            onValueChange={() => handleToggle(capability.id)}
                            trackColor={{
                                false: colors.background.tertiary,
                                true: colors.accent.brightBlue,
                            }}
                            thumbColor={
                                capabilities[capability.id]
                                    ? colors.accent.lightBlue
                                    : colors.text.muted
                            }
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    capabilitiesContainer: {
        marginTop: 8,
    },
    capabilityItem: {
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
    capabilityContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    capabilityIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.background.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    capabilityText: {
        flex: 1,
    },
    capabilityName: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.text.primary,
        marginBottom: 2,
    },
    capabilityDescription: {
        fontSize: 12,
        color: colors.text.secondary,
    },
});

export default AICapabilitiesToggle;
