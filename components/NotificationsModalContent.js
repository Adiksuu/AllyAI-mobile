import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const NotificationsModalContent = ({ onEnable, onNotNow }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const handleEnable = () => {
        onEnable();
    };

    const handleNotNow = () => {
        onNotNow();
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.content}>
            <Text style={styles.introducingLabel}>
                {t("notificationsModal.manageNotifications")}
            </Text>
            <Text style={styles.title}>{t("notificationsModal.title")}</Text>

            <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={colors.accent.lightBlue}
                        />
                    </View>
                    <View style={styles.featureContent}>
                        <Text style={styles.featureTitle}>
                            {t("notificationsModal.features.stayTuned.title")}
                        </Text>
                        <Text style={styles.featureDescription}>
                            {t(
                                "notificationsModal.features.stayTuned.description"
                            )}
                        </Text>
                    </View>
                </View>

                <View style={styles.featureItem}>
                    <View style={styles.featureIcon}>
                        <Ionicons
                            name="flash-outline"
                            size={24}
                            color={colors.accent.lightBlue}
                        />
                    </View>
                    <View style={styles.featureContent}>
                        <Text style={styles.featureTitle}>
                            {t(
                                "notificationsModal.features.instantInsights.title"
                            )}
                        </Text>
                        <Text style={styles.featureDescription}>
                            {t(
                                "notificationsModal.features.instantInsights.description"
                            )}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.enableButton}
                    onPress={handleEnable}
                >
                    <Ionicons
                        name="notifications"
                        size={20}
                        color={colors.primary.black}
                    />
                    <Text style={styles.enableButtonText}>
                        {t("common.enable")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.notNowButton}
                    onPress={handleNotNow}
                >
                    <Text style={styles.notNowButtonText}>
                        {t("notificationsModal.notNow")}
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
            marginBottom: 32,
        },
        featuresList: {
            marginBottom: 32,
        },
        featureItem: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 24,
        },
        featureIcon: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },
        featureContent: {
            flex: 1,
        },
        featureTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 4,
        },
        featureDescription: {
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
        },
        buttonsContainer: {
            gap: 12,
        },
        enableButton: {
            backgroundColor: colors.text.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 12,
            gap: 8,
        },
        enableButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
        notNowButton: {
            alignItems: "center",
            paddingVertical: 12,
        },
        notNowButtonText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.secondary,
        },
    });

export default NotificationsModalContent;
