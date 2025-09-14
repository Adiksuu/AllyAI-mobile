import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Send a token reset notification to the user
 * @param {string} language - Current language ('en' or 'pl')
 */
export const sendTokenResetNotification = async (language = "en") => {
    try {
        // Import translations dynamically based on language
        const translations =
            language === "pl"
                ? await import("../translations/pl.js")
                : await import("../translations/en.js");

        const t = language === "pl" ? translations.pl : translations.en;

        // Check if notifications are enabled in both permissions and settings
        const canSend = await canSendNotifications();
        if (!canSend) {
            console.log("Notifications not enabled or permissions not granted");
            return false;
        }

        // Schedule the notification immediately
        await Notifications.scheduleNotificationAsync({
            content: {
                title: t.notifications.tokenReset.title,
                body: t.notifications.tokenReset.body,
                data: {
                    type: "token_reset",
                    timestamp: Date.now(),
                },
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                categoryIdentifier: "token_reset",
            },
            trigger: null, // Send immediately
        });

        console.log("Token reset notification sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending token reset notification:", error);
        return false;
    }
};

/**
 * Schedule a token reset notification for a future time
 * @param {number} resetTimestamp - Timestamp when tokens will reset
 * @param {string} language - Current language ('en' or 'pl')
 * @param {string} userId - User ID for notification identification
 */
export const scheduleTokenResetNotification = async (resetTimestamp, language = "en", userId = null) => {
    try {
        // Import translations dynamically based on language
        const translations =
            language === "pl"
                ? await import("../translations/pl.js")
                : await import("../translations/en.js");

        const t = language === "pl" ? translations.pl : translations.en;

        // Check if notifications are enabled in both permissions and settings
        const canSend = await canSendNotifications();
        if (!canSend) {
            console.log("Notifications not enabled or permissions not granted");
            return false;
        }

        // Cancel any existing token reset notifications for this user
        if (userId) {
            await cancelTokenResetNotifications(userId);
        }

        // Calculate seconds from now until reset
        const now = Date.now();
        const secondsUntilReset = Math.max(0, Math.floor((resetTimestamp - now) / 1000));

        if (secondsUntilReset <= 0) {
            console.log("Reset time is in the past, sending immediate notification");
            return await sendTokenResetNotification(language);
        }

        // Schedule the notification for the reset time
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: t.notifications.tokenReset.title,
                body: t.notifications.tokenReset.body,
                data: {
                    type: "token_reset",
                    timestamp: resetTimestamp,
                    userId: userId,
                },
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                categoryIdentifier: "token_reset",
            },
            trigger: {
                seconds: secondsUntilReset,
                repeats: false,
            },
        });

        console.log(`Token reset notification scheduled for ${new Date(resetTimestamp).toISOString()}, ID: ${notificationId}`);
        return notificationId;
    } catch (error) {
        console.error("Error scheduling token reset notification:", error);
        return false;
    }
};

/**
 * Cancel all scheduled token reset notifications for a user
 * @param {string} userId - User ID
 */
export const cancelTokenResetNotifications = async (userId) => {
    try {
        // Get all scheduled notifications
        const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

        // Filter notifications that are token reset notifications for this user
        const tokenResetNotifications = scheduledNotifications.filter(
            notification =>
                notification.content.data?.type === "token_reset" &&
                notification.content.data?.userId === userId
        );

        // Cancel each notification
        for (const notification of tokenResetNotifications) {
            await Notifications.cancelScheduledNotificationAsync(notification.identifier);
        }

        console.log(`Cancelled ${tokenResetNotifications.length} token reset notifications for user ${userId}`);
        return true;
    } catch (error) {
        console.error("Error cancelling token reset notifications:", error);
        return false;
    }
};

/**
 * Send a local notification with custom content
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Additional data to include
 */
export const sendLocalNotification = async (title, body, data = {}) => {
    try {
        // Check if notifications are enabled in both permissions and settings
        const canSend = await canSendNotifications();
        if (!canSend) {
            console.log("Notifications not enabled or permissions not granted");
            return false;
        }

        // Schedule the notification immediately
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data: {
                    timestamp: Date.now(),
                    ...data,
                },
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });

        console.log("Local notification sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending local notification:", error);
        return false;
    }
};

/**
 * Check if notifications are enabled
 * @returns {Promise<boolean>} Whether notifications are enabled
 */
export const areNotificationsEnabled = async () => {
    try {
        const { status } = await Notifications.getPermissionsAsync();
        return status === "granted";
    } catch (error) {
        console.error("Error checking notification permissions:", error);
        return false;
    }
};

/**
 * Request notification permissions
 * @returns {Promise<boolean>} Whether permissions were granted
 */
export const requestNotificationPermissions = async () => {
    try {
        const { status } = await Notifications.requestPermissionsAsync();
        return status === "granted";
    } catch (error) {
        console.error("Error requesting notification permissions:", error);
        return false;
    }
};

/**
 * Check if notifications are enabled in app settings
 * @returns {Promise<boolean>} Whether notifications are enabled
 */
export const areNotificationsEnabledInSettings = async () => {
    try {
        const enabled = await AsyncStorage.getItem("@allyai_notifications_enabled");
        return enabled === "true";
    } catch (error) {
        console.error("Error checking notification settings:", error);
        return false;
    }
};

/**
 * Enable or disable notifications in app settings
 * @param {boolean} enabled - Whether to enable notifications
 * @returns {Promise<boolean>} Success status
 */
export const setNotificationsEnabled = async (enabled) => {
    try {
        await AsyncStorage.setItem("@allyai_notifications_enabled", enabled ? "true" : "false");
        return true;
    } catch (error) {
        console.error("Error setting notification settings:", error);
        return false;
    }
};

/**
 * Check if notifications can be sent (both permissions and settings enabled)
 * @returns {Promise<boolean>} Whether notifications can be sent
 */
export const canSendNotifications = async () => {
    try {
        const permissionsGranted = await areNotificationsEnabled();
        const settingsEnabled = await areNotificationsEnabledInSettings();
        return permissionsGranted && settingsEnabled;
    } catch (error) {
        console.error("Error checking if notifications can be sent:", error);
        return false;
    }
};
