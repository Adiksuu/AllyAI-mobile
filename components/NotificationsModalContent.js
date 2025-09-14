import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import {
    areNotificationsEnabledInSettings,
    setNotificationsEnabled,
    requestNotificationPermissions,
    canSendNotifications
} from "../functions/notifications";

const NotificationsModalContent = ({ onEnable, onNotNow }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkNotificationStatus();
    }, []);

    const checkNotificationStatus = async () => {
        try {
            const enabled = await areNotificationsEnabledInSettings();
            setIsEnabled(enabled);
        } catch (error) {
            console.error("Error checking notification status:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleNotifications = async (value) => {
        try {
            setIsLoading(true);

            if (value) {
                // Enabling notifications - request permissions first
                const permissionsGranted = await requestNotificationPermissions();
                if (!permissionsGranted) {
                    console.log("Notification permissions not granted");
                    setIsLoading(false);
                    return;
                }
            }

            // Update the setting
            const success = await setNotificationsEnabled(value);
            if (success) {
                setIsEnabled(value);
                // Don't call onEnable() here - the toggle only updates the setting
                // The actual notification scheduling happens when tokens are reset
            }
        } catch (error) {
            console.error("Error toggling notifications:", error);
        } finally {
            setIsLoading(false);
        }
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

            <View style={styles.toggleContainer}>
                <View style={styles.toggleRow}>
                    <View style={styles.toggleContent}>
                        <Ionicons
                            name="notifications"
                            size={24}
                            color={colors.accent.lightBlue}
                        />
                        <View style={styles.toggleTextContainer}>
                            <Text style={styles.toggleTitle}>
                                {t("notificationsModal.enableNotifications")}
                            </Text>
                            <Text style={styles.toggleDescription}>
                                {isEnabled
                                    ? t("notificationsModal.notificationsEnabled")
                                    : t("notificationsModal.notificationsDisabled")
                                }
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={isEnabled}
                        onValueChange={handleToggleNotifications}
                        disabled={isLoading}
                        trackColor={{
                            false: colors.background.secondary,
                            true: colors.accent.lightBlue
                        }}
                        thumbColor={isEnabled ? colors.primary.white : colors.text.secondary}
                    />
                </View>
            </View>

            <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleNotNow}
                >
                    <Text style={styles.closeButtonText}>
                        {t("common.close")}
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
        toggleContainer: {
            marginBottom: 24,
        },
        toggleRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
        },
        toggleContent: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        toggleTextContainer: {
            marginLeft: 16,
            flex: 1,
        },
        toggleTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 2,
        },
        toggleDescription: {
            fontSize: 14,
            color: colors.text.secondary,
        },
        closeButtonContainer: {
            alignItems: "center",
        },
        closeButton: {
            paddingVertical: 12,
            paddingHorizontal: 24,
        },
        closeButtonText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.text.secondary,
        },
    });

export default NotificationsModalContent;
