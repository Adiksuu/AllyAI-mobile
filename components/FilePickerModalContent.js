import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const FilePickerModalContent = ({
    onSelectImage,
    onSelectFile,
    onCancel,
}) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const options = [
        {
            key: "image",
            title: t("filePickerModal.selectImage") || "Select Image",
            description: t("filePickerModal.selectImageDescription") || "Choose an image from your gallery",
            icon: "image",
            onPress: onSelectImage,
        },
        {
            key: "file",
            title: t("filePickerModal.selectFile") || "Select File",
            description: t("filePickerModal.selectFileDescription") || "Choose a document or text file",
            icon: "document-text",
            onPress: onSelectFile,
        },
    ];

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <Text style={styles.introducingLabel}>
                {t("filePickerModal.selectOption") || "SELECT YOUR"}
            </Text>
            <Text style={styles.title}>
                {t("filePickerModal.title") || "Attachment"}
            </Text>

            <View style={styles.optionsList}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        style={styles.optionItem}
                        onPress={option.onPress}
                    >
                        <View style={styles.optionInfo}>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name={option.icon}
                                    size={24}
                                    color={colors.text.secondary}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.optionTitle}>
                                    {option.title}
                                </Text>
                                <Text style={styles.optionDescription}>
                                    {option.description}
                                </Text>
                            </View>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.secondary}
                        />
                    </TouchableOpacity>
                ))}
            </View>

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
        optionsList: {
            marginBottom: 24,
        },
        optionItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginBottom: 12,
            borderRadius: 12,
            backgroundColor: colors.background.secondary,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        optionInfo: {
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
        optionTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 4,
        },
        optionDescription: {
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
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

export default FilePickerModalContent;