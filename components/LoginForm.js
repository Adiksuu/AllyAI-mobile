import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { signInWithEmail, sendPasswordResetEmail } from "../functions/auth";

const LoginForm = ({ onLogin, onSwitchToRegister, onForgotPassword }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if (!email.trim() || !password.trim()) {
            setError(t("auth.invalidCredentials"));
            return;
        }

        setIsLoading(true);
        const result = await signInWithEmail(email.trim(), password);

        if (result.success) {
            onLogin(result.user);
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            setError(t("auth.errors.invalidEmail"));
            return;
        }

        setIsLoading(true);
        const result = await sendPasswordResetEmail(email.trim());

        if (result.success) {
            setError(t("auth.errors.passwordResetSent"));
        } else {
            // Translate error key to actual message
            const errorKey = result.error;
            setError(t(`auth.errors.${errorKey}`));
        }

        setIsLoading(false);
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("auth.email")}</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("auth.emailPlaceholder")}
                    placeholderTextColor={colors.text.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("auth.password")}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={t("auth.passwordPlaceholder")}
                        placeholderTextColor={colors.text.muted}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color={colors.text.muted}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
            >
                <Text style={styles.forgotPasswordText}>
                    {t("auth.forgotPassword")}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.loginButtonText}>
                    {isLoading ? "..." : t("auth.loginButton")}
                </Text>
            </TouchableOpacity>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("auth.noAccount")}</Text>
                <TouchableOpacity onPress={onSwitchToRegister}>
                    <Text style={styles.switchLink}>{t("auth.signUp")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            width: "100%",
        },
        inputContainer: {
            marginBottom: 20,
        },
        inputLabel: {
            fontSize: 14,
            fontWeight: "500",
            color: colors.text.primary,
            marginBottom: 8,
        },
        input: {
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            color: colors.text.primary,
        },
        passwordContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background.secondary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        passwordInput: {
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            color: colors.text.primary,
        },
        eyeButton: {
            padding: 12,
        },
        forgotPasswordButton: {
            alignSelf: "flex-end",
            marginBottom: 24,
        },
        forgotPasswordText: {
            fontSize: 14,
            color: colors.accent.lightBlue,
            fontWeight: "500",
        },
        loginButton: {
            backgroundColor: colors.accent.lightBlue,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 24,
        },
        loginButtonDisabled: {
            opacity: 0.6,
        },
        loginButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
        switchContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        switchText: {
            fontSize: 14,
            color: colors.text.secondary,
        },
        switchLink: {
            fontSize: 14,
            color: colors.accent.lightBlue,
            fontWeight: "600",
            marginLeft: 4,
        },
        errorText: {
            fontSize: 14,
            color: colors.status.error || "#ff4444",
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 20,
        },
    });

export default LoginForm;