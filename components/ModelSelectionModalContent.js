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

const ModelSelectionModalContent = ({
    onModelSelect,
    onCancel,
    currentModel,
}) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const models = [
        {
            code: "ALLY-3",
            name: "ALLY-3",
            description: "Advanced conversational AI for text-based interactions",
            icon: "chatbubble",
        },
        {
            code: "ALLY-IMAGINE",
            name: "ALLY-IMAGINE",
            description: "AI-powered image generation and creative assistance",
            icon: "image",
        },
    ];

    const handleModelPress = (model) => {
        onModelSelect(model.code);
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <Text style={styles.introducingLabel}>
                {t("modelSelectionModal.selectModel") || "SELECT YOUR"}
            </Text>
            <Text style={styles.title}>
                {t("modelSelectionModal.title") || "AI Model"}
            </Text>

            <ScrollView
                style={styles.modelsList}
                showsVerticalScrollIndicator={false}
            >
                {models.map((model, index) => (
                    <TouchableOpacity
                        key={model.code}
                        style={[
                            styles.modelItem,
                            currentModel === model.code &&
                                styles.selectedModelItem,
                        ]}
                        onPress={() => handleModelPress(model)}
                    >
                        <View style={styles.modelInfo}>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name={model.icon}
                                    size={24}
                                    color={
                                        currentModel === model.code
                                            ? colors.accent.lightBlue
                                            : colors.text.secondary
                                    }
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text
                                    style={[
                                        styles.modelName,
                                        currentModel === model.code &&
                                            styles.selectedModelName,
                                    ]}
                                >
                                    {model.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.modelDescription,
                                        currentModel === model.code &&
                                            styles.selectedModelDescription,
                                    ]}
                                >
                                    {model.description}
                                </Text>
                            </View>
                        </View>
                        {currentModel === model.code && (
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
                        {t("common.cancel") || "Cancel"}
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
        modelsList: {
            marginBottom: 24,
            maxHeight: 300,
        },
        modelItem: {
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
        selectedModelItem: {
            backgroundColor: colors.background.card,
            borderColor: colors.accent.lightBlue,
        },
        modelInfo: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.background.primary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },
        textContainer: {
            flex: 1,
        },
        modelName: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 4,
        },
        selectedModelName: {
            color: colors.accent.lightBlue,
            fontWeight: "700",
        },
        modelDescription: {
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
        },
        selectedModelDescription: {
            color: colors.text.primary,
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

export default ModelSelectionModalContent;