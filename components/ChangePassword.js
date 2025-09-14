import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { changePassword } from "../functions/auth";

const ChangePassword = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChangePassword = async () => {
        // Clear previous messages
        setError("");
        setSuccess(false);

        // Validation
        if (!currentPassword.trim()) {
            setError(t("changePassword.errors.emptyCurrentPassword"));
            return;
        }

        if (!newPassword.trim()) {
            setError(t("changePassword.errors.emptyNewPassword"));
            return;
        }

        if (newPassword.length < 6) {
            setError(t("changePassword.errors.passwordTooShort"));
            return;
        }

        if (currentPassword === newPassword) {
            setError(t("changePassword.errors.samePassword"));
            return;
        }

        setIsLoading(true);

        try {
            const result = await changePassword(currentPassword, newPassword);

            if (result.success) {
                setSuccess(true);
                setCurrentPassword("");
                setNewPassword("");
                setError("");
            } else {
                // Translate error key to actual message
                const errorKey = result.error;
                setError(t(`changePassword.errors.${errorKey}`));
            }
        } catch (error) {
            setError(t("changePassword.errors.generic"));
        } finally {
            setIsLoading(false);
        }
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={colors.accent.lightBlue}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {t("accountManagement.password.title")}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t("accountManagement.password.subtitle")}
                    </Text>
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        {t("changePassword.currentPassword")}
                    </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder={t(
                                "changePassword.currentPasswordPlaceholder"
                            )}
                            placeholderTextColor={colors.text.muted}
                            secureTextEntry={!showCurrentPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                        >
                            <Ionicons
                                name={showCurrentPassword ? "eye-off" : "eye"}
                                size={20}
                                color={colors.text.muted}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        {t("changePassword.newPassword")}
                    </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder={t(
                                "changePassword.newPasswordPlaceholder"
                            )}
                            placeholderTextColor={colors.text.muted}
                            secureTextEntry={!showNewPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Ionicons
                                name={showNewPassword ? "eye-off" : "eye"}
                                size={20}
                                color={colors.text.muted}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {error ? (
                    <View style={styles.messageContainer}>
                        <Ionicons
                            name="alert-circle"
                            size={20}
                            color={colors.status.error}
                        />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {success ? (
                    <View style={styles.messageContainer}>
                        <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color={colors.status.success}
                        />
                        <Text style={styles.successText}>{t("changePassword.success")}</Text>
                    </View>
                ) : null}

                <TouchableOpacity
                    style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]}
                    onPress={handleChangePassword}
                    disabled={isLoading}
                >
                    <Text style={styles.confirmButtonText}>
                        {isLoading ? t("changePassword.changing") : t("changePassword.confirmButton")}
                    </Text>
                </TouchableOpacity>
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
        form: {
            marginTop: 8,
        },
        inputContainer: {
            marginBottom: 16,
        },
        inputLabel: {
            fontSize: 14,
            fontWeight: "500",
            color: colors.text.primary,
            marginBottom: 8,
        },
        inputWrapper: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background.secondary,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border.secondary,
            minHeight: 48,
        },
        input: {
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 16,
            color: colors.text.primary,
            minHeight: 48,
            textAlignVertical: "center",
        },
        eyeButton: {
            padding: 12,
        },
        confirmButton: {
            backgroundColor: colors.accent.lightBlue,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 8,
        },
        confirmButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
        confirmButtonDisabled: {
            opacity: 0.6,
        },
        messageContainer: {
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            gap: 8,
        },
        errorText: {
            fontSize: 14,
            color: colors.status.error,
            flex: 1,
        },
        successText: {
            fontSize: 14,
            color: colors.status.success,
            flex: 1,
        },
    });

export default ChangePassword;
