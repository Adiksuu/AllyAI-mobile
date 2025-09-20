import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import Constants from "expo-constants";

const UpdateModalContent = ({ onUpdateNow, onLater, updateData }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const handleUpdateNow = () => {
        Linking.openURL(updateData.release.downloadUrl);
        onUpdateNow();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <View style={styles.content}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="download-outline"
                        size={32}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <Text style={styles.introducingLabel}>
                    {t("updateModal.newVersion")}
                </Text>
                <Text style={styles.title}>{t("updateModal.title")}</Text>
            </View>

            <ScrollView style={styles.updateInfo} showsVerticalScrollIndicator={false}>
                <View style={styles.versionContainer}>
                    <View style={styles.versionItem}>
                        <Text style={styles.versionLabel}>
                            {t("updateModal.currentVersion")}
                        </Text>
                        <Text style={styles.versionValue}>
                            {Constants.expoConfig?.version}
                        </Text>
                    </View>
                    <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={colors.text.muted}
                        style={styles.arrow}
                    />
                    <View style={styles.versionItem}>
                        <Text style={styles.versionLabel}>
                            {t("updateModal.newVersionLabel")}
                        </Text>
                        <Text style={[styles.versionValue, styles.newVersionValue]}>
                            {updateData.release.version}
                        </Text>
                    </View>
                </View>

                <View style={styles.releaseInfo}>
                    <Text style={styles.releaseName}>
                        {updateData.release.name}
                    </Text>
                    <Text style={styles.publishedDate}>
                        {formatDate(updateData.release.publishedAt)}
                    </Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.whatsNewTitle}>
                        {t("updateModal.whatsNew")}
                    </Text>
                    <Text style={styles.description}>
                        {updateData.release.description}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.laterButton}
                    onPress={onLater}
                >
                    <Text style={styles.laterButtonText}>
                        {t("updateModal.later")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={handleUpdateNow}
                >
                    <Ionicons
                        name="download"
                        size={20}
                        color={colors.text.primary}
                    />
                    <Text style={styles.updateButtonText}>
                        {t("updateModal.updateNow")}
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
            maxHeight: 600,
        },
        header: {
            alignItems: "center",
            marginBottom: 24,
        },
        iconContainer: {
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
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
            fontSize: 28,
            fontWeight: "bold",
            color: colors.text.primary,
            textAlign: "center",
        },
        updateInfo: {
            marginBottom: 24,
            maxHeight: 350,
        },
        versionContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
        },
        versionItem: {
            alignItems: "center",
            flex: 1,
        },
        versionLabel: {
            fontSize: 12,
            color: colors.text.secondary,
            marginBottom: 4,
            textTransform: "uppercase",
            letterSpacing: 0.5,
        },
        versionValue: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
        },
        newVersionValue: {
            color: colors.accent.lightBlue,
        },
        arrow: {
            marginHorizontal: 12,
        },
        releaseInfo: {
            alignItems: "center",
            marginBottom: 20,
        },
        releaseName: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text.primary,
            textAlign: "center",
            marginBottom: 4,
        },
        publishedDate: {
            fontSize: 14,
            color: colors.text.secondary,
        },
        descriptionContainer: {
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
            padding: 16,
        },
        whatsNewTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 12,
        },
        description: {
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
        },
        buttonsContainer: {
            flexDirection: "row",
            gap: 12,
        },
        laterButton: {
            flex: 1,
            alignItems: "center",
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.secondary,
        },
        laterButtonText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.secondary,
        },
        updateButton: {
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: colors.accent.lightBlue,
            gap: 8,
        },
        updateButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
        },
    });

export default UpdateModalContent;