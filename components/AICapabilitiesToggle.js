import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const AICapabilitiesToggle = ({ selectedTools, onToolsChange, disabled = false }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    // Convert array format to object format for easier state management
    const getCapabilitiesFromTools = (tools) => {
        return {
            'Web Search': tools.includes('Web Search'),
            'Image Generation': tools.includes('Image Generation'),
            'Memory & Context': tools.includes('Memory & Context'),
            'Voice Response': tools.includes('Voice Response'),
            'File Analysis': tools.includes('File Analysis'),
        };
    };

    const [capabilities, setCapabilities] = useState(getCapabilitiesFromTools(selectedTools || []));

    // Update local state when props change
    React.useEffect(() => {
        setCapabilities(getCapabilitiesFromTools(selectedTools || []));
    }, [selectedTools]);

    const capabilityItems = [
        {
            id: "Web Search",
            name: t("aiCapabilities.webSearch.name"),
            description: t("aiCapabilities.webSearch.description"),
            icon: "globe-outline",
        },
        {
            id: "Image Generation",
            name: t("aiCapabilities.imageGeneration.name"),
            description: t("aiCapabilities.imageGeneration.description"),
            icon: "image-outline",
        },
        {
            id: "Memory & Context",
            name: t("aiCapabilities.memoryContext.name"),
            description: t("aiCapabilities.memoryContext.description"),
            icon: "archive-outline",
        },
        {
            id: "Voice Response",
            name: t("aiCapabilities.voiceResponse.name"),
            description: t("aiCapabilities.voiceResponse.description"),
            icon: "volume-high-outline",
        },
        {
            id: "File Analysis",
            name: t("aiCapabilities.fileAnalysis.name"),
            description: t("aiCapabilities.fileAnalysis.description"),
            icon: "document-text-outline",
        },
    ];

    const handleToggle = (capabilityId) => {
        if (disabled) return;

        const newCapabilities = {
            ...capabilities,
            [capabilityId]: !capabilities[capabilityId],
        };

        setCapabilities(newCapabilities);

        // Convert back to array format for database
        const toolsArray = Object.keys(newCapabilities).filter(key => newCapabilities[key]);

        if (onToolsChange) {
            onToolsChange(toolsArray);
        }
    };

    const styles = getStyles(colors);

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
                    <Text style={styles.title}>
                        {t("aiCapabilities.title")}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t("aiCapabilities.subtitle")}{" "}
                    </Text>
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
                            disabled={disabled}
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
