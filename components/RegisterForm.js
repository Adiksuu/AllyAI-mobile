import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import { signUpWithEmail } from "../functions/auth";

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!email.trim()) {
            setError(t("auth.errors.invalidEmail"));
            return false;
        }

        if (!password.trim() || password.length < 6) {
            setError(t("auth.errors.weakPassword"));
            return false;
        }

        if (password !== confirmPassword) {
            setError(t("auth.errors.passwordsDontMatch"));
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        setError("");

        if (!validateForm()) return;

        setIsLoading(true);
        const result = await signUpWithEmail(email.trim(), password);

        if (result.success) {
            onRegister(result.user);
        } else {
            // Translate error key to actual message
            const errorKey = result.error;
            setError(t(`auth.errors.${errorKey}`));
        }

        setIsLoading(false);
    };

    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("auth.confirmPassword")}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={t("auth.confirmPasswordPlaceholder")}
                        placeholderTextColor={colors.text.muted}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye-off" : "eye"}
                            size={20}
                            color={colors.text.muted}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
            >
                <Text style={styles.registerButtonText}>
                    {isLoading ? "..." : t("auth.registerButton")}
                </Text>
            </TouchableOpacity>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <Text style={styles.termsText}>
                {t("auth.termsAndPrivacy")}
            </Text>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("auth.hasAccount")}</Text>
                <TouchableOpacity onPress={onSwitchToLogin}>
                    <Text style={styles.switchLink}>{t("auth.signIn")}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        registerButton: {
            backgroundColor: colors.accent.lightBlue,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 16,
        },
        registerButtonDisabled: {
            opacity: 0.6,
        },
        registerButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary.black,
        },
        termsText: {
            fontSize: 12,
            color: colors.text.secondary,
            textAlign: "center",
            lineHeight: 18,
            marginBottom: 24,
        },
        switchContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 0,
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

export default RegisterForm;